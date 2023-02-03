import { createSlice } from "@reduxjs/toolkit";
import { resourceErrorsToStrs } from './ErrorsToStrs';

const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        errors: [],
        isFetching: true,
        isEditing: false,
        resource: {},
        themeTitle: '',
    },
    reducers: {
        fetchingResource(state) {
            state.isFetching = true;
        },
        fetchingResourceSuccess(state, action) {
            state.isFetching = false;
            state.resource = action.payload.resource;
            state.themeTitle = action.payload.themeTitle;
            state.errors = [];
        },
        fetchingResourceError(state, action) {
            state.isFetching = false;
            state.errors = resourceErrorsToStrs(action.payload);
        },

        updatingResource(state) {
            state.isEditing = true;
        },
        updatingResourceSuccess(state, action) {
            state.isEditing = false;
            state.errors = [];
            state.resource.title = action.payload.title;
            state.resource.description = action.payload.description;
        },
        updatingResourceError(state, action) {
            state.isEditing = false;
            state.errors = resourceErrorsToStrs(action.payload);
        },
    },
});

export const {
    fetchingResource, fetchingResourceError, fetchingResourceSuccess,
    updatingResource, updatingResourceError, updatingResourceSuccess,
} = resourceSlice.actions;
export default resourceSlice.reducer;
