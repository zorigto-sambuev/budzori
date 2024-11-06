import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5500', // This should be your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;