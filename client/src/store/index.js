import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { themeAPI } from '../api/Themes';
import { resourceApi } from '../api/Resources';
import { authAPI } from '../api/Auth';
import authSlice from './Auth/AuthSlice';

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [themeAPI.reducerPath]: themeAPI.reducer,
    [resourceApi.reducerPath]: resourceApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
});



export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(themeAPI.middleware)
            .concat(resourceApi.middleware)
            .concat(authAPI.middleware),
});
