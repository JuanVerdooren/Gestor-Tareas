import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/Home.module.css';
const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:5000/api/users');
            const data = await res.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <main className={`${styles.container} mx-auto p-6`}>
                <h1 className={`${styles.h1} text-3xl font-bold mb-4`}>Usuarios</h1>
                <UserForm setUsers={setUsers} />
                <div className={styles.card + " mt-6"}>
                    <h2 className={`${styles.h2} text-2xl font-semibold`}>Lista de Usuarios</h2>
                    <UserList users={users} />
                </div>
            </main>
        </div>
    );
};

export default Users;