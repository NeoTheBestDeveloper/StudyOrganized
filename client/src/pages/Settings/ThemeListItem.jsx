import { Link, useNavigate } from 'react-router-dom'

import s from './themelistitem.module.css'

function ThemeListItem(props) {
    const navigate = useNavigate();

    const goToTheme = () => {
        navigate('/theme', {
            state: {
                themeId: props.id
            }
        });
    }
    return (
        <li className={s.theme_item}>
            <a className={s.theme_title} onClick={goToTheme}>{props.title}</a>
            <button type="button" className={s.cross_button}>
                <img src="assets/cross.svg" alt="Крестик" />
            </button>
        </li >
    );
}

export default ThemeListItem;
