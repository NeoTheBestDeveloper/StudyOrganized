import { getClient } from "./Config";

export const fetchSavedThemesAPI = async () => {
    return await getClient().get('/users/me/themes?type=saved');
}

export const createThemeAPI = async (title) => {
    return await getClient().post('/themes', { title });
}

export const deleteThemeAPI = async (id) => {
    await getClient().delete(`/themes/${id}`);
}