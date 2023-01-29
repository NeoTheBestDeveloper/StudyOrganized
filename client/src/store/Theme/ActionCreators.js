import { client } from "../../api/Config";
import resourcesSlice from "./ResourcesSlice";

import themeSlice from "./ThemeSlice";

export const fetchTheme = (id, savedThemes, searchedThemes) => async (dispatch) => {

    try {
        dispatch(themeSlice.actions.fetchingTheme());
        let res = savedThemes.find(theme => theme.id === id);

        if (res) {
            dispatch(themeSlice.actions.fetchingThemeSuccess(savedThemes[res]));
            return;
        }

        res = searchedThemes.find(theme => theme.id === id);

        if (res) {
            dispatch(themeSlice.actions.fetchingThemeSuccess(savedThemes[res]));
            return;
        }

        const response = await client.get(`/themes/${id}`);
        dispatch(themeSlice.actions.fetchingThemeSuccess(response.data));
    } catch (e) {
        dispatch(themeSlice.actions.fetchingThemeError(e.message));
    }
}

export const updateTheme = (id, title, description) => async (dispatch) => {
    try {
        dispatch(themeSlice.actions.updatingTheme());
        await client.put(`/themes/${id}`, { title, description });
        dispatch(themeSlice.actions.updatingThemeSuccess());
    } catch (e) {
        dispatch(themeSlice.actions.updatingThemeError(e.message));
    }
}

export const createResource = (theme_id, title) => async (dispatch) => {
    try {
        dispatch(resourcesSlice.actions.creatingResource());
        await client.post(`/resources`, { title, theme_id });
        dispatch(resourcesSlice.actions.creatingResourceSuccess());
    } catch (e) {
        dispatch(resourcesSlice.actions.creatingResourceError(e.message));
    }
}

export const deleteResource = (id) => async (dispatch) => {
    try {
        dispatch(resourcesSlice.actions.deletingResource())
        await client.delete(`/resources/${id}`);
        dispatch(resourcesSlice.actions.deletingResourceSuccess());
    } catch (e) {
        dispatch(resourcesSlice.actions.deletingResourceError(e.message));
    }
}
