import { useContext } from 'react';
import { logoutAPI } from '../../api/api';

import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import s from './profile.module.css';

function Profile() {
    const { user } = useContext(AuthContext);

    const logout = async () => {
        logoutAPI().then(res => {
            window.location.reload();
        });
    }

    return (
        <main className="profile">
            <Navbar />
            <div className={s.profile_name}>Имя <span className={s.bold}>{user.name}</span></div>
            <div className={s.profile_email}>Почта <span className={s.bold}>{user.email}</span></div>
            <button className={s.logout_btn} type='button' onClick={logout}>Выйти</button>
        </main>
    );
}

export default Profile;
