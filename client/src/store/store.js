import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './Auth/Slices/AuthSlice';
import userReducer from './Auth/Slices/UserSlice';
import errorReducer from './Error/Slices/ErrorSlice';
import savedThemesReducer from './Settings/Slices/SavedThemesSlice';
import themeReducer from './Theme/Slices/ThemeSlice';
import resourcesReducer from './Theme/Slices/ResourcesSlice';
import resourceReducer from './Resource/Slices/ResourceSlice';
import searchReducer from './Search/Slices/SearchSlice';

const rootReducer = combineReducers({
    searchReducer,
    resourceReducer,
    themeReducer,
    savedThemesReducer,
    errorReducer,
    userReducer,
    authReducer,
    resourcesReducer,
});

export default configureStore({
    reducer: rootReducer,
});
