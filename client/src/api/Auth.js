import { getClient, setToken, deleteToken } from './Config';

export const isAuthAPI = async () => {
    return await getClient().get('/users/me/isauth');
}

export const loginAPI = async (email, password) => {
    const formData = new FormData();
    formData.set('username', email);
    formData.set('password', password);

    const response = await getClient().post('/auth/token/login', formData);

    setToken(response.data.access_token);
    return response;
}

export const registerAPI = async (name, email, password) => {
    return await getClient().post('/auth/register', { name, email, password });
}

export const logoutAPI = async () => {
    const result = await getClient().post('/auth/token/logout');
    deleteToken();
    return result;
}

export const fetchMeAPI = async () => {
    return await getClient().get('/users/me');
}
