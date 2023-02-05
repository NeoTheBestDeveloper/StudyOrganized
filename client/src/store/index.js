import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './Auth/AuthSlice';
import userReducer from './Auth/UserSlice';
import errorReducer from './Error/ErrorSlice';
import savedThemesReducer from './Settings/SavedThemesSlice';
import themeReducer from './Theme/ThemeSlice';
import resourcesReducer from './Theme/ResourcesSlice';
import resourceReducer from './Resource/ResourceSlice';
import searchReducer from './Search/SearchSlice';

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
