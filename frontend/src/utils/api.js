import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Send cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear user data and redirect to login
            localStorage.removeItem('user');
            // Check if we are already on the login page to avoid loops
            if (!window.location.pathname.startsWith('/signin')) {
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
