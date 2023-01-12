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
    const token = localStorage.getItem('token');
    return await client.post('/auth/token/logout/', {}, { headers: { Authorization: `Token ${token}` } });
}

export const getUserAPI = async () => {
    const token = localStorage.getItem('token');
    return await client.get('/auth/users/me/', { headers: { Authorization: `Token ${token}` } });
}

export const addThemeAPI = async (title, short_description, full_description) => {
    const token = localStorage.getItem('token');
    return await client.post(
        '/theme/',
        { title, short_description, full_description },
        { headers: { Authorization: `Token ${token}` } }
    )
}

export const getThemeAPI = async (id) => {
    return await client.get(`/theme/${id}`)
}


export const getThemesAPI = async () => {
    const token = localStorage.getItem('token');
    return await client.get(
        '/themes/',
        { headers: { Authorization: `Token ${token}` } }
    );
}

export const getResourceAPI = async (id) => {
    return await client.get(`/resource/${id}`)
}

export const getResourcesAPI = async (theme_id) => {
    return await client.get(`/resources/${theme_id}`);
}

export const addResourceAPI = async (theme_id, title, short_description, full_description) => {
    const token = localStorage.getItem('token');
    return await client.post(
        '/resource/',
        { theme_id, title, short_description, full_description },
        { headers: { Authorization: `Token ${token}` } }
    )
}
