import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      // Si no hay token, no intentamos validar y dejamos de cargar
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Importante: tu backend debe tener una ruta /verify o /me 
        // que devuelva los datos del usuario basándose en el token/cookie
        const res = await axios.get('/auth/verify'); 
        setUser(res.data);
      } catch (error) {
        console.error("Token inválido o expirado");
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
  try {
    // 1. Opcional: Avisar al backend (si tienes la ruta configurada)
    await axios.post('/auth/logout');
  } catch (error) {
    console.error("Error al avisar al backend del logout", error);
  } finally {
    // 2. Limpiar el token del localStorage (¡Muy importante!)
    localStorage.removeItem('token');

    // 3. Resetear el estado del usuario a null
    setUser(null);

    // Al poner el usuario en null, el ProtectedRoute de App.jsx 
    // detectará el cambio y te mandará al /login automáticamente.
  }
};

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);