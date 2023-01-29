import { createSlice } from "@reduxjs/toolkit";
import { authErrorsToStrs } from "./ErrorsToStrs";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isRegistered: false,
        isLoading: false,
        errors: [],
    },
    reducers: {
        fetchingAuthStatus(state) {
            state.isLoading = true;
        },
        fetchingAuthStatusSuccess(state, action) {
            state.isLoading = false;
            state.errors = [];
            state.isAuth = action.payload === 'true';
        },
        fetchingAuthStatusError(state, action) {
            state.isLoading = false;
            state.errors = authErrorsToStrs(action.payload);
        },

        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setIsRegistered(state, action) {
            state.isRegistered = action.payload;
        },
    },
});

export default authSlice.reducer;

export const {
    setIsAuth, setIsRegistered,
    fetchingAuthStatus, fetchingAuthStatusError, fetchingAuthStatusSuccess,
} = authSlice.actions;
