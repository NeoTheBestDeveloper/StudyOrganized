import { createSlice } from "@reduxjs/toolkit";

import { themeErrorsToStrs } from './../ErrorsToStrs';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        errors: [],
        isFetching: false,
        isEditing: false,
        theme: {
            resources: [],
            user: {},
        },
    },
    reducers: {
        fetchingTheme(state) {
            state.isFetching = true;
        },
        fetchingThemeSuccess(state, action) {
            state.isFetching = false;
            state.theme = action.payload;
            state.errors = [];
        },
        fetchingThemeError(state, action) {
            state.isFetching = false;
            state.errors = themeErrorsToStrs(action.payload);
        },

        updatingTheme(state) {
            state.isEditing = true;
        },
        updatingThemeSuccess(state, action) {
            state.isEditing = false;
            state.errors = [];
            state.theme.title = action.payload.title;
            state.theme.description = action.payload.description;
        },
        updatingThemeError(state, action) {
            state.isEditing = false;
            state.errors = themeErrorsToStrs(action.payload);
        },
    },
});

export const {
    fetchingTheme, fetchingThemeError, fetchingThemeSuccess,
    updatingTheme, updatingThemeError, updatingThemeSuccess,
} = themeSlice.actions;
export default themeSlice.reducer;
