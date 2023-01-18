import { Route, Routes } from 'react-router-dom'

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import Resource from './pages/Resource/Resource';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';
import Tasks from './pages/Tasks/Tasks';
import Theme from './pages/Theme/Theme';

import s from './App.module.css'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { authAPI } from './api/Auth';
import { useDispatch } from 'react-redux';
import authSlice from './store/Auth/AuthSlice';
import { useEffect } from 'react';

function App() {
    const { data, isLoading } = authAPI.useGetMeQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data)
            dispatch(authSlice.actions.authUser(data));
    }, [data, dispatch]);


    return (
        <div className={s.wrapper}>
            {!isLoading &&
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

                    <Route exact path="/" element={<PrivateRoute> <Main /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/resource" element={<PrivateRoute><Resource /></PrivateRoute>} />
                    <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
                    <Route path="/theme" element={<PrivateRoute><Theme /></PrivateRoute>} />
                </Routes>
            }
        </div >
    );
}

export default App;
