import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';

import AuthContext from './context/AuthContext';

import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Main from './pages/Main/main';
import Profile from './pages/Profile/profile';
import Resource from './pages/Resource/resource';
import Search from './pages/Search/search';
import Settings from './pages/Settings/settings';
import Tasks from './pages/Tasks/tasks';
import Theme from './pages/Theme/theme';

import s from './app.module.css'
import PrivateRoute from './components/PrivateRoute';
import { getUserAPI } from './api/api';

function App() {
    const effectRan = useRef(false);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        if (!effectRan.current) {
            const getUser = async () => {
                getUserAPI()
                    .then(res => {
                        setUser(res.data);
                        setIsAuth(true);
                    })
                    .catch(e => {
                        setIsAuth(false);
                        console.log(e.response);
                    });
            }

            getUser();
        }

        return () => {
            effectRan.current = true;
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth, setIsAuth, user,
        }}>
            <div className={s.wrapper}>
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
            </div >
        </AuthContext.Provider>
    );
}

export default App;
