import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchedThemes: [],
        isLoading: false,
        error: '',
    },
    reducers: {
        searchingThemes(state) {
            state.isLoading = true;
        },
        searchingThemesSuccess(state, action) {
            state.isLoading = false;
            state.error = '';
            state.searchedThemes = action.payload;
        },
        searchingThemesError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

    },
});

export default searchSlice;
