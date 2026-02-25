import React from 'react';
import { 
  LayoutGrid, 
  ClipboardList, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* 1. SECCIÓN SUPERIOR: Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <LayoutGrid size={24} color="#2D6A4F" />
        </div>
        <h2 className={styles.logoText}>
          Restaurant<span>Management</span>
        </h2>
      </div>

      {/* 2. SECCIÓN CENTRAL: Navegación (Esta sección "empuja" al resto) */}
      <nav className={styles.nav}>
        <ul>
          <li className={styles.active}>
            <LayoutGrid size={20} />
            <span>Tables</span>
          </li>
          <li>
            <ClipboardList size={20} />
            <span>Orders</span>
          </li>
          
          {user?.role === 'admin' && (
            <>
              <li>
                <BarChart3 size={20} />
                <span>Sales</span>
              </li>
              <li>
                <Users size={20} />
                <span>Staff</span>
              </li>
            </>
          )}
          <li>
            <Settings size={20} />
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      {/* 3. SECCIÓN INFERIOR: Perfil de Usuario (Anclado al fondo) */}
      <div className={styles.userProfile}>
        <div className={styles.profileClickable} onClick={() => console.log('Cambiar imagen')}>
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random`} 
            alt="User" 
            className={styles.avatar} 
          />
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.username || 'Usuario'}</p>
            <p className={styles.userRole}>{user?.role || 'Staff'}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout} 
          className={styles.logoutBtn} 
          title="Cerrar Sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;