import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    auth: {
        username: 'Harshitha',
        password: 'harshitha123'
    }
});

export default API;


