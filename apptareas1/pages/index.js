import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
<link 
  rel="stylesheet" 
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
  integrity="sha384-DyZv6Wv... (hash aquí)" 
  crossorigin="anonymous"
/>

const Home = () => {
    return (
        <div>
            <Head>
                <title>Inicio - SEMPERTEX</title>
                <meta name="description" content="Aplicación de gestión de tareas" />
            </Head>
            <Navbar/> 
            <main className={`${styles.container} mx-auto p-6`}>
                <h1 className={`${styles.h1} text-3xl font-bold mb-4`}>Bienvenido a SEMPERTEX</h1>
                <p className="mt-4 text-lg text-gray-700">Organiza y prioriza tus tareas de manera efectiva.</p>
                <div className={`${styles.card} mt-6 p-4`}>
                    <h2 className={`${styles.h2} text-2xl font-semibold`}>¿Qué es SEMPERTEX?</h2>
                    <p className="mt-2 text-gray-600">
                        SEMPERTEX es una aplicación diseñada para ayudarte a gestionar tus tareas de forma eficiente. 
                        Puedes añadir, editar y eliminar tareas, lo que te permitirá tener un mejor control sobre tu tiempo y prioridades.
                    </p>
                    <p className="mt-2 text-gray-600">
                        ¡Comienza a organizar tus tareas y aumenta tu productividad hoy mismo!
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Home;