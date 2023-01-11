import axios from 'axios'

const baseURL = 'http://localhost/api';

const client = axios.create({
    baseURL: baseURL,
});


export const registerAPI = async (name, email, password) => {
    return await client.post('/auth/users/', { name, email, password });
}

export const loginAPI = async (email, password) => {
    return await client.post('/auth/token/login/', { email, password }).then((response) => {
        const token = response.data.auth_token;
        localStorage.setItem('token', token);
    });
}

export const logoutAPI = async () => {
    return await client.post('/logout').then(res => res.data);
}

export const getUserAPI = () => {
    const token = localStorage.getItem('token');
    return client.get('/auth/users/me/', { headers: { Authorization: `Token ${token}` } });
}

export const addThemeAPI = async (title, short_description, full_description) => {
    return await client.post('/theme', { title, short_description, full_description })
        .then(res => res.data);
}

export const getThemeAPI = async (id) => {
    return await client.get(`/theme/${id}`)
        .then(res => res.data);
}

export const getThemesAPI = async () => {
    return await client.get('/themes').then(res => res.data);
}
