import { saveThemeAPI, searchThemesAPI } from "../../api/Theme";

import {
    savingTheme, savingThemeError, savingThemeSuccess,
    searchingThemes, searchingThemesError, searchingThemesSuccess
} from "./Slices/SearchSlice";

export const searchThemes = (value, key = 'all', order = 'desc', offset = 0, limit = 100) => async (dispatch) => {
    try {
        dispatch(searchingThemes());
        const response = await searchThemesAPI(value, key, order, offset, limit);
        dispatch(searchingThemesSuccess(response.data));
    } catch (e) {
        dispatch(searchingThemesError(e.message));
    }
}

export const saveTheme = (themeId) => async (dispatch) => {
    try {
        dispatch(savingTheme());
        await saveThemeAPI(themeId);
        dispatch(savingThemeSuccess());
    } catch (e) {
        dispatch(savingThemeError(e.message));
    }
}
