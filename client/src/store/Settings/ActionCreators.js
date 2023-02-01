import {
    savedThemesCreating, savedThemesCreatingError, savedThemesCreatingSuccess,
    savedThemesDeleting, savedThemesDeletingError, savedThemesDeletingSuccess,
    savedThemesFetching, savedThemesFetchingError, savedThemesFetchingSuccess,
} from "./SavedThemesSlice"

import { getClient } from '../../api/Config';

const handleError = (dispatch, e, actionCreator) => {
    const detail = e.response.data.detail ? e.response.data.detail : 'Некорректный ответ от сервера.';
    dispatch(actionCreator({ detail, status: e.response.status }));
}

export const fetchSavedThemes = () => async (dispatch) => {
    try {
        dispatch(savedThemesFetching());
        const response = await getClient.get('/users/me/themes?type=saved');
        dispatch(savedThemesFetchingSuccess(response.data));
    } catch (e) {
        handleError(dispatch, e, savedThemesFetchingError);
    }
}

export const createTheme = (title) => async (dispatch) => {
    try {
        dispatch(savedThemesCreating());
        const response = await getClient.post('/themes', { title });
        dispatch(savedThemesCreatingSuccess(response.data));
    } catch (e) {
        handleError(dispatch, e, savedThemesCreatingError);
    }
}

export const deleteTheme = (id) => async (dispatch) => {
    try {
        dispatch(savedThemesDeleting());
        await getClient.delete(`/themes/${id}`);
        dispatch(savedThemesDeletingSuccess(id));
    } catch (e) {
        handleError(dispatch, e, savedThemesDeletingError);
    }
} 
