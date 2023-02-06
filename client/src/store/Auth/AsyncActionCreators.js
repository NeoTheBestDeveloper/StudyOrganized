import { fetchMeAPI, isAuthAPI, loginAPI, logoutAPI, registerAPI } from "../../api/Auth";
import {
    fetchingAuthStatus, fetchingAuthStatusError, fetchingAuthStatusSuccess,
    setIsAuth,
    setIsRegistered,
} from "./Slices/AuthSlice";
import {
    fetchingMe, fetchingMeError, fetchingMeSuccess,
    logingUser, logingUserError, logingUserSuccess,
    logoutingUser, logoutingUserError, logoutingUserSuccess,
    registeringUser, registeringUserError, registeringUserSuccess
} from "./Slices/UserSlice";

const handleError = (dispatch, e, actionCreator) => {
    const detail = e.response.data.detail ? e.response.data.detail : 'Некорректный ответ от сервера.';
    dispatch(actionCreator({ detail, status: e.response.status }));
}


export const checkIsAuth = () => async (dispatch) => {
    try {
        dispatch(fetchingAuthStatus());
        const response = await isAuthAPI();
        dispatch(fetchingAuthStatusSuccess(response.data));
    } catch (e) {
        handleError(dispatch, e, fetchingAuthStatusError);
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutingUser());
        await logoutAPI();
        dispatch(logoutingUserSuccess());
        dispatch(setIsAuth(false));
    } catch (e) {
        handleError(dispatch, e, logoutingUserError);
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(logingUser());
        const response = await loginAPI(email, password);
        dispatch(setIsAuth(true));
        dispatch(logingUserSuccess(response.data));
    } catch (e) {
        handleError(dispatch, e, logingUserError);
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch(registeringUser());
        const response = await registerAPI(name, email, password);
        dispatch(registeringUserSuccess(response.data))
        dispatch(setIsRegistered(true));
    } catch (e) {
        handleError(dispatch, e, registeringUserError);
    }
}

export const fetchMe = () => async (dispatch) => {
    try {
        dispatch(fetchingMe());
        const response = await fetchMeAPI();
        dispatch(fetchingMeSuccess(response.data))
    } catch (e) {
        handleError(dispatch, e, fetchingMeError);
    }
}
