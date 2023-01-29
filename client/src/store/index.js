import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './Auth/AuthSlice';
import userReducer from './Auth/UserSlice';
import errorReducer from './Error/ErrorSlice';
import savedThemesSlice from './Settings/SavedThemesSlice';
import themeSlice from './Theme/ThemeSlice';
import searchSlice from './Search/searchSlice';
import resourcesSlice from './Theme/ResourcesSlice';

const rootReducer = combineReducers({
    [resourcesSlice.name]: resourcesSlice.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
    [savedThemesSlice.name]: savedThemesSlice.reducer,
    errorReducer,
    userReducer,
    authReducer,
});

export default configureStore({
    reducer: rootReducer,
});
