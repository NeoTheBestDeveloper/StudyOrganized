import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/Auth/AsyncActionCreators';

import s from './Profile.module.css';

function Profile() {
    const dispatch = useDispatch();

    const { isAuth } = useSelector(state => state.authReducer);
    const { user } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (!isAuth) {
            window.location.reload();
        }
    }, [isAuth]);

    const logoutWrapper = async () => {
        dispatch(logout());
    }

    return (
        <main className={s.profile}>
            <div className={s.profile_name}>Имя <span className={s.bold}>{user.name}</span></div>
            <div className={s.profile_email}>Почта <span className={s.bold}>{user.email}</span></div>
            <button className={s.logout_btn} type='button' onClick={logoutWrapper}>Выйти</button>
        </main>
    );
}

export default Profile;
