import { createSlice } from "@reduxjs/toolkit";

import { authErrorsToStrs } from "./ErrorsToStrs";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLoading: false,
        errors: [],
    },
    reducers: {
        registeringUser(state) {
            state.isLoading = true;
        },
        registeringUserSuccess(state) {
            state.isLoading = false;
            state.errors = [];
        },
        registeringUserError(state, action) {
            state.isLoading = false;
            state.errors = authErrorsToStrs(action.payload);
        },

        logingUser(state) {
            state.isLoading = true;
        },
        logingUserSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.errors = [];
        },
        logingUserError(state, action) {
            state.isLoading = false;
            state.errors = authErrorsToStrs(action.payload);
        },

        logoutingUser(state) {
            state.isLoading = true;
        },
        logoutingUserSuccess(state) {
            state.isLoading = false;
            state.user = {};
            state.errors = [];
        },
        logoutingUserError(state, action) {
            state.isLoading = false;
            state.errors = authErrorsToStrs(action.payload);
        },

        fetchingMe(state) {
            state.isLoading = true;
        },
        fetchingMeSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.errors = [];
        },
        fetchingMeError(state, action) {
            state.isLoading = false;
            state.errors = authErrorsToStrs(action.payload);
        },
    },
})


export const {
    fetchingMe, fetchingMeError, fetchingMeSuccess,
    logingUser, logingUserError, logingUserSuccess,
    logoutingUser, logoutingUserError, logoutingUserSuccess,
    registeringUser, registeringUserError, registeringUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
