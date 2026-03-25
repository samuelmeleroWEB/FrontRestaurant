import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  LogOut,
  UtensilsCrossed
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      await logout();
    }
  };

  const isActive = (path) => location.pathname === path ? styles.active : "";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <LayoutGrid size={24} color="#2D6A4F" />
        </div>
        <h2 className={styles.logoText}>
          Restaurant<span>Management</span>
        </h2>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li className={isActive("/menu")}>
            <Link to="/menu" className={styles.navLink}>
              <UtensilsCrossed size={20} />
              <span>Menú</span>
            </Link>
          </li>
          <li className={isActive("/")}>
            <Link to="/" className={styles.navLink}>
              <LayoutGrid size={20} />
              <span>Tables</span>
            </Link>
          </li>
          <li className={isActive("/orders")}>
            <Link to="/orders" className={styles.navLink}>
              <ClipboardList size={20} />
              <span>Orders</span>
            </Link>
          </li>

          {user?.role === "admin" && (
            <>
              <li className={isActive("/sales")}>
                <Link to="/sales" className={styles.navLink}>
                  <BarChart3 size={20} />
                  <span>Sales</span>
                </Link>
              </li>
              <li className={isActive("/staff")}>
                <Link to="/staff" className={styles.navLink}>
                  <Users size={20} />
                  <span>Staff</span>
                </Link>
              </li>
            </>
          )}
          <li className={isActive("/settings")}>
            <Link to="/settings" className={styles.navLink}>
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.userProfile}>
        <div
          className={styles.profileClickable}
          onClick={() => console.log("Cambiar imagen")}
        >
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.username || "U"}&background=random`
            }
            alt="User"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.username || "Usuario"}</p>
            <p className={styles.userRole}>{user?.role || "Staff"}</p>
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