import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: {}
    },
    reducers: {
        authSuccess(state) {
            state.isAuth = true;
        },
        authUser(state, action) {
            state.isAuth = true;
            state.user = action.payload;
        },
        logoutUser(state) {
            state.isAuth = false;
            state.user = {};
        }
    },
});

export default authSlice;
