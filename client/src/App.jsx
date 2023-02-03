import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { showMessages } from './store/Error/ErrorSlice';
import { checkIsAuth, fetchMe } from './store/Auth/ActionCreators';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import Resource from './pages/Resource/Resource';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';
import Tasks from './pages/Tasks/Tasks';
import Theme from './pages/Theme/Theme';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import ErrorMessages from './components/ErrorMessage/ErrorMessages';

import s from './App.module.css'

function App() {
    const dispatch = useDispatch();
    const authChecked = useRef(false);
    const userFetched = useRef(false);

    const authState = useSelector(state => state.authReducer);
    const userState = useSelector(state => state.userReducer);

    useEffect(() => {
        if (!authChecked.current) {
            dispatch(checkIsAuth());
        }

        if (!authState.isLoading && authState.errors.length) {
            dispatch(showMessages(authState.errors));
        }

        if (!authState.isLoading && !userState.isLoading && authState.isAuth && !userFetched.current) {
            dispatch(fetchMe());
            userFetched.current = true;
        }

        if (!userState.isLoading && userState.errors.length) {
            dispatch(showMessages(userState.errors));
        }

        return () => {
            authChecked.current = true;
        }

    }, [authState.errors, userState.errors, authState.isAuth]);


    return (
        <div className={s.wrapper}>
            <Navbar />
            <ErrorMessages />
            {!authState.isLoading &&
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/resources/:id" element={<PrivateRoute><Resource /></PrivateRoute>} />
                    <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
                    <Route path="/themes/:id" element={<PrivateRoute><Theme /></PrivateRoute>} />
                </Routes>
            }
        </div >
    );
}

export default App;
