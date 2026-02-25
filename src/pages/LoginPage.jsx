import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConciergeBell, Eye, EyeOff } from 'lucide-react'; // Importamos ambos estados del ojo
import axios from '../api/axios';
import styles from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token); 
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales incorrectas');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconContainer}>
                    <ConciergeBell size={48} strokeWidth={1.5} />
                </div>
                
                <h2 className={styles.title}>Restaurant Management System</h2>

                {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '10px' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input 
                            type="email" 
                            className={styles.input} 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"} // Cambia el tipo dinámicamente
                                className={styles.input} 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* Icono que cambia y alterna el estado al hacer clic */}
                            <span 
                                className={styles.eyeIcon} 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                    </div>
                    
                    <button type="submit" className={styles.loginButton}>Log In</button>
                </form>
                
                <p className={styles.footerText}>
                    Don't have an account? <span className={styles.signUpLink} onClick={() => navigate('/register')}>Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;