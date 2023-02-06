import { createSlice } from "@reduxjs/toolkit";

import { searchErrorsToStrs } from './../ErrorsToStrs';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchedThemes: [],
        isFetching: false,
        errors: [],
    },
    reducers: {
        searchingThemes(state) {
            state.isFetching = true;
        },
        searchingThemesSuccess(state, action) {
            state.isFetching = false;
            state.errors = [];
            state.searchedThemes = action.payload;
        },
        searchingThemesError(state, action) {
            state.isFetching = false;
            state.errors = searchErrorsToStrs(action.payload);
        },

        savingTheme(state) {
            state.isFetching = true;
        },
        savingThemeSuccess(state, action) {
            state.isFetching = false;
            state.errors = [];
        },
        savingThemeError(state, action) {
            state.isFetching = false;
            state.errors = searchErrorsToStrs(action.payload);
        },

    },
});

export const {
    searchingThemes, searchingThemesSuccess, searchingThemesError,
    savingTheme, savingThemeSuccess, savingThemeError,
} = searchSlice.actions;
export default searchSlice.reducer;
