import axios from 'axios';

const API = axios.create({
    baseURL: 'http://django-backend:8000/api',
    auth: {
        username: 'Harshitha',
        password: 'harshitha123'
    }
});

export default API;


