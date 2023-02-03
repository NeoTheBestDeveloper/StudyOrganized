import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './Auth/AuthSlice';
import userReducer from './Auth/UserSlice';
import errorReducer from './Error/ErrorSlice';
import savedThemesReducer from './Settings/SavedThemesSlice';
import themeReducer from './Theme/ThemeSlice';
import resourcesReducer from './Theme/ResourcesSlice';
import resourceReducer from './Resource/ResourceSlice';
import searchSlice from './Search/searchSlice';

const rootReducer = combineReducers({
    /* [searchSlice.name]: searchSlice.reducer, */
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
