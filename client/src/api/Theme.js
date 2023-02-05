import { getClient } from "./Config";

export const fetchSavedThemesAPI = async () => {
    return await getClient().get('/users/me/themes?type=saved');
}

export const fetchThemeAPI = async (id) => {
    return await getClient().get(`/themes/${id}`);
}

export const createThemeAPI = async (title) => {
    return await getClient().post('/themes', { title });
}

export const updateThemeAPI = async (id, title, description) => {
    return await getClient().put(`/themes/${id}`, { title, description });
}

export const deleteThemeAPI = async (id) => {
    await getClient().delete(`/themes/${id}`);
}

export const searchThemesAPI = async (value, key = 'all', order = 'desc', offset = 0, limit = 100) => {
    return await getClient().get(`/themes?value=${value}&key=${key}&order=${order}&offset=${offset}&limit=${limit}&`);
}

export const saveThemeAPI = async (themeId) => {
    return await getClient().post(`/users/me/save/themes/${themeId}`);
}
