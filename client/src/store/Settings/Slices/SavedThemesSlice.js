import { createSlice } from "@reduxjs/toolkit";

import { settingsErrorsToStrs } from './../ErrorsToStrs';

const savedThemesSlice = createSlice({
    name: 'savedThemes',
    initialState: {
        savedThemes: [],
        isFetching: false,
        isEditing: false,
        isNewThemeFormShown: false,
        errors: [],
    },
    reducers: {
        savedThemesFetching(state) {
            state.isFetching = true;
        },
        savedThemesFetchingSuccess(state, action) {
            state.isFetching = false;
            state.errors = [];
            state.savedThemes = action.payload;
        },
        savedThemesFetchingError(state, action) {
            state.isFetching = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

        savedThemesCreating(state) {
            state.isEditing = true;
        },
        savedThemesCreatingSuccess(state, action) {
            state.isNewThemeFormShown = false;
            state.savedThemes.push(action.payload);
            state.isEditing = false;
            state.errors = [];
        },
        savedThemesCreatingError(state, action) {
            state.isNewThemeFormShown = false;
            state.isEditing = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

        savedThemesDeleting(state) {
            state.isEditing = true;
        },
        savedThemesDeletingSuccess(state, action) {
            state.isEditing = false;
            state.errors = [];
            state.savedThemes = state.savedThemes.filter(item => item.id !== action.payload);
        },
        savedThemesDeletingError(state, action) {
            state.isEditing = false;
            state.errors = settingsErrorsToStrs(action.payload);
        },

        showNewThemeForm(state) {
            state.isNewThemeFormShown = true;
        },
    },
});

export default savedThemesSlice.reducer;
export const {
    savedThemesFetching, savedThemesFetchingError, savedThemesFetchingSuccess,
    savedThemesCreating, savedThemesCreatingError, savedThemesCreatingSuccess,
    savedThemesDeleting, savedThemesDeletingError, savedThemesDeletingSuccess,
    showNewThemeForm,
} = savedThemesSlice.actions;
