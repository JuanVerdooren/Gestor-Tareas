import { useEffect, useState } from "react";
import Link from 'next/link';


const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medio");
  const [status, setStatus] = useState("pendiente");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users"); // Asegúrate de que esta URL sea correcta
        if (!res.ok) {
          throw new Error('Error en la respuesta de la API'); // Manejo de errores HTTP
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data); // Solo establece si es un array
        } else {
          console.error('La respuesta no es un arreglo', data);
          setUsers([]); // Asegúrate de que sea un array
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setUsers([]); // Asegúrate de que sea un array vacío en caso de error
      }
    };
    fetchUsers();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo: assignedTo || null,
    };
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    alert("La tarea se ha creado exitosamente");


    const data = await res.json();
    setTasks((prevTasks) => [...prevTasks, data]);
    // Limpiar los campos del formulario
    setTitle("");
    setDescription("");
    setPriority("medio");
    setStatus("pendiente");
    setDueDate("");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light p-3 rounded shadow">
  <h3 className="mb-4">Agregar Nueva Tarea</h3>

  <div className="row mb-3">
    <label htmlFor="title" className="col-sm-2 col-form-label">Título</label>
    <div className="col-sm-10">
      <input
        type="text"
        id="title"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-control"
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="description" className="col-sm-2 col-form-label">Descripción</label>
    <div className="col-sm-10">
      <textarea
        id="description"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-control"
        rows="2"
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="priority" className="col-sm-2 col-form-label">Prioridad</label>
    <div className="col-sm-10">
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-select"
      >
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="status" className="col-sm-2 col-form-label">Estado</label>
    <div className="col-sm-10">
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="form-select"
      >
        <option value="pendiente">Pendiente</option>
        <option value="en proceso">En Proceso</option>
        <option value="completado">Completado</option>
      </select>
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="dueDate" className="col-sm-2 col-form-label">Fecha de Vencimiento</label>
    <div className="col-sm-10">
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="form-control"
      />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="assignedTo" className="col-sm-2 col-form-label">Asignar a</label>
    <div className="col-sm-10">
      <select
        id="assignedTo"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="form-select"
      >
        <option value="">Asignar a...</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  </div>
<div className="d-flex justify-content-between">
<button type="submit" className="btn btn-success">
    Agregar Tarea
  </button>

  <Link href="/tasks1">
  <button className="btn btn-primary">Ver listas de tareas</button>
</Link>
</div>
  
</form>

  );
};

export default TaskForm;
