import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", document: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("La respuesta no es un arreglo:", data);
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleDelete = async (document) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/document/${document}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error en la respuesta:', errorText);
          alert(`Error: ${errorText}`);
          throw new Error('No se pudo eliminar el usuario.');
        }

        alert("El usuario se ha eliminado exitosamente");
        // Actualiza el estado inmediatamente
        setUsers(prevUsers => prevUsers.filter(user => user.document !== document));
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert(`No se pudo eliminar el usuario. Intenta nuevamente. Error: ${error.message}`);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, document: user.document });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/users/document/${formData.document}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error en la respuesta:', errorText);
        throw new Error('No se pudo actualizar el usuario.');
      }

      const updatedUser = await res.json();
      setUsers(prevUsers =>
        prevUsers.map(user => (user.document === updatedUser.document ? updatedUser : user))
      );

      // Restablece el formulario
      setEditingUser(null);
      setFormData({ name: "", email: "", document: "" });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("No se pudo actualizar el usuario. Intenta nuevamente.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="my-4">
        <input
          type="text"
          placeholder="Buscar usuario por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow-md mt-4" style={{ display: editingUser ? "block" : "none" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Documento"
          value={formData.document}
          onChange={(e) => setFormData({ ...formData, document: e.target.value })}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="btn btn-success">Actualizar Usuario</button>
      </form>

      <h2 className="text-2xl font-bold mt-6">Lista de Usuarios</h2>
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.document} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">Documento: {user.document}</p>
                <div className="d-flex justify-content-between">
                  <button onClick={() => handleEdit(user)} className="btn btn-warning">Editar</button>
                  <button onClick={() => handleDelete(user.document)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
