import { useEffect, useState } from "react";

const TaskList = ({ tasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medio",
    status: "pendiente",
    dueDate: "",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (title) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tasks/title/${encodeURIComponent(title)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error en la respuesta:", errorText);
          alert(`Error: ${errorText}`);
          throw new Error("No se pudo eliminar la tarea.");
        }

        alert("La tarea se ha eliminado exitosamente");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.title !== title)
        );
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert(
          `No se pudo eliminar la tarea. Intenta nuevamente. Error: ${error.message}`
        );
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate.split("T")[0],
      assignedTo: task.assignedTo ? task.assignedTo._id : "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedTask = await res.json();
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setEditingTask(null);
      setFormData({
        title: "",
        description: "",
        priority: "medio",
        status: "pendiente",
        dueDate: "",
        assignedTo: "",
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("No se pudo actualizar la tarea. Intenta nuevamente.");
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar tarea por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-4 rounded shadow-md mt-4"
        style={{ display: editingTask ? "block" : "none" }}
      >
        <h3>Actualizar Tarea</h3>
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        >
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en proceso">En Proceso</option>
          <option value="completado">Completado</option>
        </select>

        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <select
          value={formData.assignedTo}
          onChange={(e) =>
            setFormData({ ...formData, assignedTo: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Asignar a...</option>
          {loading ? (
            <option value="">Cargando usuarios...</option>
          ) : error ? (
            <option value="">Error al cargar usuarios</option>
          ) : users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))
          ) : (
            <option value="">No hay usuarios disponibles</option>
          )}
        </select>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, assignedTo: "" })}
          className="btn btn-danger"
        >
          Quitar Asignación
        </button>

        <button type="submit" className="btn btn-success">
          Actualizar Tarea
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6">Lista de Tareas</h2>

      <div className="mt-4">
        {filteredTasks.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="border p-4 rounded-lg shadow-md w-full md:w-1/3"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Prioridad: {task.priority}</p>
                <p>Estado: {task.status}</p>
                <p>
                  Fecha de vencimiento:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                {task.assignedTo && (
                  <p>
                    Asignado a:{" "}
                    {users.find((user) => user._id === task.assignedTo)?.name ||
                      "No asignado"}
                  </p>
                )}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-warning"
                    aria-label={`Editar tarea ${task.title}`}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(task.title)}
                    className="btn btn-danger"
                    aria-label={`Eliminar tarea ${task.title}`}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
