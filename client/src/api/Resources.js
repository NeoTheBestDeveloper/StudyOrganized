import { getClient } from './Config';

export const fetchThemeResourcesAPI = async (themeId) => {
    return await getClient().get(`/themes/${themeId}/resources`);
}

export const fetchResourceAPI = async (id) => {
    return await getClient().get(`/resources/${id}`);
}

export const createResourceAPI = async (themeId, title) => {
    return await getClient().post(`/resources`, { title, theme_id: themeId });
}

export const updateResourceAPI = async (id, title, description) => {
    return await getClient().put(`/resources/${id}`, { title, description });
}

export const deleteResourceAPI = async (id) => {
    return await getClient().delete(`/resources/${id}`);
}
