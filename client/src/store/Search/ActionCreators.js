import { getClient } from "../../api/Config";

import searchSlice from "./searchSlice";

export const searchThemes = (value, key = 'all', order = 'desc', offset = 0, limit = 100) => async (dispatch) => {
    try {
        dispatch(searchSlice.actions.searchingThemes());
        const response = await getClient.get(`/themes?value=${value}&key=${key}&order=${order}&offset=${offset}&limit=${limit}&`);
        dispatch(searchSlice.actions.searchingThemesSuccess(response.data));
    } catch (e) {
        dispatch(searchSlice.actions.searchingThemesError(e.message));
    }
}
