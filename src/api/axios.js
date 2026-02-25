import axios from 'axios';

const instance = axios.create({
    // Importante: usamos import.meta.env para acceder a las variables en Vite
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true
});

export default instance;