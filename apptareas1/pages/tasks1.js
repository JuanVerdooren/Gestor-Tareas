import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from '../styles/Home.module.css'; 

const Task1 = () => {
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
            <div className={styles.card + " mt-6"}>
                <h2 className={`${styles.h2} text-2xl font-semibold`}>Lista de Tareas</h2>
                <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
        </main>
    </div>
);
}
export default Task1;