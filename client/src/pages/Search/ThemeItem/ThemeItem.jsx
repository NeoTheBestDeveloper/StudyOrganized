import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { saveTheme } from '../../../store/Search/AsyncActionCreators';

import s from './ThemeItem.module.css'

const ThemeItem = ({ hasPermissions, theme }) => {
    const dispatch = useDispatch();

    const saveThemeWrapper = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(saveTheme(theme.id));
    };

    return (
        <Link className={s.theme_item} to={`/themes/${theme.id}`} >
            <div className={s.theme_title}>{theme.title}</div>
            <div className={s.theme_text}>{theme.description}</div>
            <div className={s.theme_item__bottom}>
                <div className={s.theme_author}>Автор - {theme.user.name}</div>
                {!hasPermissions &&
                    <div className={s.button_wrapper}>
                        <button className={s.save_button} name="save_button"
                            onClick={saveThemeWrapper}>
                            Сохранить
                        </button>
                    </div>
                }
            </div>
        </Link >
    );
}

export default ThemeItem;
