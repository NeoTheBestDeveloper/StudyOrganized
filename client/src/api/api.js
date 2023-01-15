import axios from 'axios'

const baseURL = 'http://localhost/api';

const client = axios.create({
    baseURL: baseURL,
});


export const registerAPI = async (name, email, password) => {
    return await client.post('/auth/register', { name, email, password });
}

export const loginAPI = async (email, password) => {
    const formData = new FormData()
    formData.set('username', email)
    formData.set('password', password)
    return await client.post('/auth/token/login', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    },).then((response) => {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
    });
}

export const logoutAPI = async () => {
    const token = localStorage.getItem('token');
    return await client.post('/auth/token/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
}

export const getUserAPI = async () => {
    const token = localStorage.getItem('token');
    return await client.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
}

export const addThemeAPI = async (title, short_description, full_description) => {
    const token = localStorage.getItem('token');
    return await client.post(
        '/themes',
        { title, short_description, full_description },
        { headers: { Authorization: `Bearer ${token}` } }
    )
}

export const getThemeAPI = async (id) => {
    return await client.get(`/themes/${id}`)
}


export const getThemesAPI = async () => {
    const token = localStorage.getItem('token');
    return await client.get(
        '/themes/me/saved',
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

export const getResourceAPI = async (id) => {
    return await client.get(`/resources/${id}`)
}

export const getResourcesAPI = async (theme_id) => {
    return await client.get(`/themes/${theme_id}/resources`);
}

export const addResourceAPI = async (theme_id, title, short_description, full_description) => {
    return await client.post(
        '/resources',
        { theme_id, title, short_description, full_description },
    )
}

export const filterThemesAPI = async (title, offset = 0, limit = 10) => {
    return await client.get(`/themes/?title=${title}&limit=${limit}&offset=${offset}`);
}
