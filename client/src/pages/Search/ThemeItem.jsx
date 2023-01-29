import { Link } from 'react-router-dom';

import s from './ThemeItem.module.css'

const ThemeItem = ({ hasPermissions, theme }) => {
    return (
        <Link className={s.theme_item} to={`/themes/${theme.id}`} >
            <div className={s.theme_title}>{theme.title}</div>
            <div className={s.theme_text}>{theme.description}</div>
            <div className={s.theme_item__bottom}>
                <div className={s.theme_author}>Автор - {theme.user.name}</div>
                {!hasPermissions &&
                    <div className={s.button_wrapper}>
                        <button className={s.save_button} name="save_button">Сохранить</button>
                    </div>
                }
            </div>
        </Link >
    );
}

export default ThemeItem;
