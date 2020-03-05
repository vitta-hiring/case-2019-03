import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3333/api/',
    baseURL: 'http://192.168.99.100:3333/api/',
});

export default api;
