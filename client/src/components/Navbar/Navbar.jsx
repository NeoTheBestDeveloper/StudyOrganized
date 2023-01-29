import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import search_icon from './../../assets/icons/search.svg';
import settings_icon from './../../assets/icons/settings.svg';
import profile_icon from './../../assets/icons/profile.svg';

import s from './Navbar.module.css'

function Navbar() {
    const isAuth = useSelector(state => state.authReducer.isAuth);

    return (
        isAuth &&
        <nav className={s.navbar}>
            <ul className={s.navbar_items}>
                <div className={s.left}>
                    <li className={s.navbar_item}>
                        <Link to='/' className={s.navbar_item__main}>Главная</Link>
                    </li>
                </div>
                <div className={s.right}>
                    <li className={s.navbar_item}>
                        <Link to='/search' className={s.navbar_item__search}>
                            <img src={search_icon} alt="" />
                        </Link>
                    </li>
                    <li className={s.navbar_item}>
                        <Link to='/settings' className={s.navbar_item__settings}>
                            <img src={settings_icon} alt="" />
                        </Link>
                    </li>
                    <li className={s.navbar_item}>
                        <Link to='/profile' className={s.navbar_item__profile}>
                            <img src={profile_icon} alt="" />
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>

    );
}

export default Navbar;
