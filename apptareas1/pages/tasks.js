import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/Home.module.css'; 


const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('http://localhost:5000/api/tasks');
            const data = await res.json();
            setTasks(data);
        };
        fetchTasks();
    }, []); 


    return (
        <div>
            <Navbar />
            <main className={`${styles.container} mx-auto p-6`}>
                <h1 className={`${styles.h1} text-3xl font-bold mb-4`}>Tareas</h1>
                <TaskForm setTasks={setTasks} />
            </main>
        </div>
    );
};

export default Tasks;