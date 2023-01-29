import { createSlice } from "@reduxjs/toolkit";

import { settingsErrorsToStrs } from './ErrorsToStrs';

const savedThemesSlice = createSlice({
    name: 'savedThemes',
    initialState: {
        savedThemes: [],
        isLoading: false,
        errors: [],
    },
    reducers: {
        savedThemesFetching(state) {
            state.isLoading = true;
        },
        savedThemesFetchingSuccess(state, action) {
            state.isLoading = false;
            state.errors = [];
            state.savedThemes = action.payload;
        },
        savedThemesFetchingError(state, action) {
            state.isLoading = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

        savedThemesCreating(state) {
            state.isLoading = true;
        },
        savedThemesCreatingSuccess(state, action) {
            state.isLoading = false;
            state.errors = [];
            state.savedThemes.push(action.payload);
        },
        savedThemesCreatingError(state, action) {
            state.isLoading = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

        savedThemesDeleting(state) {
            state.isLoading = true;
        },
        savedThemesDeletingSuccess(state, action) {
            state.isLoading = false;
            state.errors = [];
            state.savedThemes = state.savedThemes.filter(item => item.id !== action.payload);
        },
        savedThemesDeletingError(state, action) {
            state.isLoading = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

    },
});

export default savedThemesSlice.reducer;
export const {
    savedThemesFetching, savedThemesFetchingError, savedThemesFetchingSuccess,
    savedThemesCreating, savedThemesCreatingError, savedThemesCreatingSuccess,
    savedThemesDeleting, savedThemesDeletingError, savedThemesDeletingSuccess,
} = savedThemesSlice.actions;
