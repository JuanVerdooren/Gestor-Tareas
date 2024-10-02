import { useState } from 'react';

const UserForm = ({ setUsers }) => {
    const [document, setDocument] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { document, name, email };

        console.log("Nuevo usuario a enviar:", newUser);

        try {
            const res = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            alert("El Usuario se ha creado exitosamente");


            if (res.ok) {
                const data = await res.json();
                setUsers((prevUsers) => [...prevUsers, data]);
                // Reiniciar campos
                setDocument('');
                setName('');
                setEmail('');
            } else {
                const errorData = await res.json();
                console.error("Error al agregar usuario:", errorData);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mt-4">
            <input
                type="text"
                placeholder="Documento"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
                className="border p-2 rounded w-full mb-2"
            />
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded w-full mb-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded w-full mb-2"
            />
            <button type="submit" className="btn btn-success">Agregar Usuario</button>
        </form>
    );
};

export default UserForm;