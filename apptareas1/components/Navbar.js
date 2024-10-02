import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <h1 className={styles.logo}>SEMPERTEX</h1>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/">Acerca de</Link></li>
                    <li><Link href="tasks">Tareas</Link></li>
                    <li><Link href="users">Usuarios</Link></li>
                    <li><Link href="/">Contacto</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;