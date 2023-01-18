import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from '../../api/Auth';

import Navbar from '../../components/Navbar/Navbar';
import authSlice from '../../store/Auth/AuthSlice';
import s from './Profile.module.css';

function Profile() {
    const [logout] = authAPI.useLogoutMutation();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const logoutUser = async () => {
        await logout();
        dispatch(authSlice.actions.logoutUser());
    }

    return (
        <main className="profile">
            <Navbar />
            <div className={s.profile_name}>Имя <span className={s.bold}>{user.name}</span></div>
            <div className={s.profile_email}>Почта <span className={s.bold}>{user.email}</span></div>
            <button className={s.logout_btn} type='button' onClick={logoutUser}>Выйти</button>
        </main>
    );
}

export default Profile;
