import { createSlice } from "@reduxjs/toolkit";
import { themeErrorsToStrs } from './ErrorsToStrs';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        errors: [],
        isLoading: false,
        theme: {
            resources: [],
            user: {},
        },
    },
    reducers: {
        fetchingTheme(state) {
            state.isLoading = true;
        },
        fetchingThemeSuccess(state, action) {
            state.isLoading = false;
            state.theme = action.payload;
            state.errors = [];
        },
        fetchingThemeError(state, action) {
            state.isLoading = false;
            state.errors = themeErrorsToStrs(action.payload);
        },

        updatingTheme(state) {
            state.isLoading = true;
        },
        updatingThemeSuccess(state, action) {
            state.isLoading = false;
            state.errors = [];
            state.theme.title = action.payload.title;
            state.theme.description = action.payload.description;
        },
        updatingThemeError(state, action) {
            state.isLoading = false;
            state.errors = themeErrorsToStrs(action.payload);
        },
    },
});

export const {
    fetchingTheme, fetchingThemeError, fetchingThemeSuccess,
    updatingTheme, updatingThemeError, updatingThemeSuccess,
} = themeSlice.actions;
export default themeSlice.reducer;
