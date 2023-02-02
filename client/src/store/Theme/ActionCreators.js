import { getClient } from "../../api/Config";

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

        const response = await getClient().get(`/themes/${id}`);
        dispatch(fetchingThemeSuccess(response.data));
    } catch (e) {
        dispatch(fetchingThemeError(e.message));
    }
}

export const updateTheme = (id, title, description) => async (dispatch) => {
    try {
        dispatch(updatingTheme());
        await getClient().put(`/themes/${id}`, { title, description });
        dispatch(updatingThemeSuccess({ title, description }));
    } catch (e) {
        dispatch(updatingThemeError(e.message));
    }
}

/* export const createResource = (theme_id, title) => async (dispatch) => { */
/*     try { */
/*         dispatch(resourcesSlice.actions.creatingResource()); */
/*         await getClient().post(`/resources`, { title, theme_id }); */
/*         dispatch(resourcesSlice.actions.creatingResourceSuccess()); */
/*     } catch (e) { */
/*         dispatch(resourcesSlice.actions.creatingResourceError(e.message)); */
/*     } */
/* } */
/**/
/* export const deleteResource = (id) => async (dispatch) => { */
/*     try { */
/*         dispatch(resourcesSlice.actions.deletingResource()) */
/*         await getClient.delete(`/resources/${id}`); */
/*         dispatch(resourcesSlice.actions.deletingResourceSuccess()); */
/*     } catch (e) { */
/*         dispatch(resourcesSlice.actions.deletingResourceError(e.message)); */
/*     } */
/* } */
