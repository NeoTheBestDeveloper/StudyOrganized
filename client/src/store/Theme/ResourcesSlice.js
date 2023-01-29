import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
    name: 'theme/resources',
    initialState: {
        error: '',
        isLoading: false,
    },
    reducers: {
        creatingResource(state) {
            state.isLoading = true;
        },
        creatingResourceSuccess(state) {
            state.isLoading = false;
            state.error = '';
        },
        creatingResourceError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        deletingResource(state) {
            state.isLoading = true;
        },
        deletingResourceSuccess(state) {
            state.isLoading = false;
            state.error = '';
        },
        deletingResourceError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default resourceSlice;
