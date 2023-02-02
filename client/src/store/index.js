import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './Auth/AuthSlice';
import userReducer from './Auth/UserSlice';
import errorReducer from './Error/ErrorSlice';
import savedThemesReducer from './Settings/SavedThemesSlice';
import themeReducer from './Theme/ThemeSlice';
import searchSlice from './Search/searchSlice';
import resourcesSlice from './Theme/ResourcesSlice';

const rootReducer = combineReducers({
    /* [resourcesSlice.name]: resourcesSlice.reducer, */
    /* [searchSlice.name]: searchSlice.reducer, */
    themeReducer,
    savedThemesReducer,
    errorReducer,
    userReducer,
    authReducer,
});

export default configureStore({
    reducer: rootReducer,
});
