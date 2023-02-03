import { createResourceAPI, deleteResourceAPI, fetchThemeResourcesAPI } from "../../api/Resources";
import { fetchThemeAPI, updateThemeAPI } from "../../api/Theme";

import { creatingResource, creatingResourceError, creatingResourceSuccess, deletingResource, deletingResourceError, deletingResourceSuccess, fetchingThemeResources, fetchingThemeResourcesError, fetchingThemeResourcesSuccess } from "./ResourcesSlice";
import {
    fetchingTheme, fetchingThemeError, fetchingThemeSuccess,
    updatingTheme, updatingThemeError, updatingThemeSuccess,
} from "./ThemeSlice";

export const fetchTheme = (id, savedThemes, searchedThemes) => async (dispatch) => {
    try {
        dispatch(fetchingTheme());
        let res = savedThemes.find(theme => theme.id === id);

        if (res) {
            dispatch(fetchingThemeSuccess(savedThemes[res]));
            return;
        }

        res = searchedThemes.find(theme => theme.id === id);

        if (res) {
            dispatch(fetchingThemeSuccess(savedThemes[res]));
            return;
        }

        const response = await fetchThemeAPI(id);
        dispatch(fetchingThemeSuccess(response.data));
    } catch (e) {
        dispatch(fetchingThemeError(e.message));
    }
}

export const updateTheme = (id, title, description) => async (dispatch) => {
    try {
        dispatch(updatingTheme());
        await updateThemeAPI(id, title, description);
        dispatch(updatingThemeSuccess({ title, description }));
    } catch (e) {
        dispatch(updatingThemeError(e.message));
    }
}

export const fetchThemeResources = (themeId) => async (dispatch) => {
    try {
        dispatch(fetchingThemeResources());
        const response = await fetchThemeResourcesAPI(themeId);
        dispatch(fetchingThemeResourcesSuccess(response.data));
    } catch (e) {
        dispatch(fetchingThemeResourcesError(e.message));
    }
}

export const createResource = (themeId, title) => async (dispatch) => {
    try {
        dispatch(creatingResource());
        const response = await createResourceAPI(themeId, title);
        dispatch(creatingResourceSuccess(response.data));
    } catch (e) {
        dispatch(creatingResourceError(e.message));
    }
}

export const deleteResource = (id) => async (dispatch) => {
    try {
        dispatch(deletingResource())
        await deleteResourceAPI(id);
        dispatch(deletingResourceSuccess(id));
    } catch (e) {
        dispatch(deletingResourceError(e.message));
    }
}
