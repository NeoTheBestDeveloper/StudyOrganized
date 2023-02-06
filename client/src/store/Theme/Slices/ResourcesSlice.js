import { createSlice } from "@reduxjs/toolkit";

import { themeErrorsToStrs } from './../ErrorsToStrs';

const resourcesSlice = createSlice({
    name: 'theme/resources',
    initialState: {
        resources: [],
        isFetching: false,
        isEditing: false,
        isNewResourceFormShown: false,
        errors: [],
    },
    reducers: {
        fetchingThemeResources(state) {
            state.isFetching = true;
        },
        fetchingThemeResourcesSuccess(state, action) {
            state.isFetching = false;
            state.errors = [];
            state.resources = action.payload;
        },
        fetchingThemeResourcesError(state, action) {
            state.isFetching = false;
            state.errors = themeErrorsToStrs(action.payload);
        },

        creatingResource(state) {
            state.isEditing = true;
        },
        creatingResourceSuccess(state, action) {
            state.isNewResourceFormShown = false;
            state.resources.push(action.payload);
            state.isEditing = false;
            state.errors = [];
        },
        creatingResourceError(state, action) {
            state.isEditing = false;
            state.errors = themeErrorsToStrs(action.payload);
        },

        deletingResource(state) {
            state.isEditing = true;
        },
        deletingResourceSuccess(state, action) {
            state.isEditing = false;
            state.errors = [];
            state.resources = state.resources.filter(item => item.id !== action.payload);
        },
        deletingResourceError(state, action) {
            state.isEditing = false;
            state.errors = themeErrorsToStrs(action.payload);
        },

        showNewResourceForm(state) {
            state.isNewResourceFormShown = true;
        },
    },
});

export const {
    fetchingThemeResources, fetchingThemeResourcesError, fetchingThemeResourcesSuccess,
    creatingResource, creatingResourceError, creatingResourceSuccess,
    deletingResource, deletingResourceError, deletingResourceSuccess,
    showNewResourceForm,
} = resourcesSlice.actions;
export default resourcesSlice.reducer;
