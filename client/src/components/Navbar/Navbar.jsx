import { Link } from 'react-router-dom'

import s from './Navbar.module.css'

function Navbar() {
    return (
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
                            <img src="assets/search.svg" alt="" />
                        </Link>
                    </li>
                    <li className={s.navbar_item}>
                        <Link to='/settings' className={s.navbar_item__settings}>
                            <img src="assets/settings.svg" alt="" />
                        </Link>
                    </li>
                    <li className={s.navbar_item}>
                        <Link to='/profile' className={s.navbar_item__profile}>
                            <img src="assets/profile.svg" alt="" />
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
