import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL
})

//TODO: Set up Clerk token in the headers
api.interceptors.request.use( config => {
    const adminToken = localStorage.getItem("ADMIN_TOKEN");
    const userToken = localStorage.getItem("AUTH_TOKEN");

    // Prioriza el token de admin si existe, de lo contrario usa el de usuario normal
    const token = adminToken || userToken;

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
})

export default api