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
