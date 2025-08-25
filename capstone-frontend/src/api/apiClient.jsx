import axios from 'axios';

const API_BASE_URL = 'https://final-project-y169.onrender.com/api';
// const API_BASE_URL = 'http://localhost:3000/api';
 
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized request. Redirecting to login.');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
