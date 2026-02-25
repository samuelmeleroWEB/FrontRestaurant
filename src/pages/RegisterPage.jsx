import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConciergeBell, Eye, EyeOff } from "lucide-react";
import axios from "../api/axios";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'camarero' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Estado para el mensaje de éxito
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiamos errores previos
    try {
      await axios.post("/auth/register", formData);
      setSuccess(true); // Activamos visualmente el éxito
      
      // Esperamos 2 segundos para que el usuario lea el mensaje y redirigimos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <ConciergeBell size={48} strokeWidth={1.5} />
        </div>

        <h2 className={styles.title}>Create your Account</h2>

        {/* Mensaje de Éxito */}
        {success && (
          <div className={styles.successMessage}>
            ¡Registro completado con éxito! Redirigiendo...
          </div>
        )}

        {/* Mensaje de Error */}
        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "0.8rem",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={success} // Bloqueamos edición si ya tuvo éxito
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={success}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Role</label>
            <select
              name="role"
              className={styles.input}
              value={formData.role}
              onChange={handleChange}
              required
              disabled={success}
            >
              <option value="camarero">Camarero</option>
              <option value="cocina">Personal de Cocina</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Ocultamos el botón si ya tuvo éxito para evitar doble envío */}
          {!success && (
            <button type="submit" className={styles.loginButton}>
              Sign Up
            </button>
          )}
        </form>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <span
            className={styles.signUpLink}
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;