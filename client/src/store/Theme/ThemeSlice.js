import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        error: '',
        isFetching: false,
        isUpdating: false,
        isDeleting: false,
        isCreating: false,
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
            state.error = '';
        },
        fetchingThemeError(state, action) {
            state.isFetching = false;
            state.error = action.payload;
        },

        setTheme(state, action) {
            state.theme = action.payload;
        },

        updatingTheme(state) {
            state.isUpdating = true;
        },
        updatingThemeSuccess(state) {
            state.isUpdating = false;
            state.error = '';
        },
        updatingThemeError(state, action) {
            state.isUpdating = false;
            state.error = action.payload;
        },
    },
});

export default themeSlice;
