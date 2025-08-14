import axios from 'axios';

<<<<<<< HEAD
const API_BASE_URL = 'http://localhost:3000/api';
=======
const API_BASE_URL = 'https://project-kpe2.onrender.com/api';
>>>>>>> 66d7825a5585c06086543776053b992996e02513

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
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