import { useNavigate } from 'react-router-dom'
import { themeAPI } from '../../api/Themes';

import s from './ThemeItem.module.css'

const ThemeItem = (props) => {
    const navigate = useNavigate();
    const [saveThemeAPI] = themeAPI.useSaveThemeMutation();

    const goToTheme = (e) => {
        if (e.target.name === 'save_button') {
            e.stopPropagation();
        } else {
            navigate('/theme', { state: { themeId: props.theme.id } })
        }
    }

    const saveTheme = async () => {
        const { data, error } = await saveThemeAPI(props.theme.id);
    }

    return (
        <li className={s.theme_item} onClick={e => goToTheme(e)}>
            <div className={s.theme_title}>{props.theme.title}</div>
            <div className={s.theme_text}>{props.theme.description}</div>
            <div className={s.theme_item__bottom}>
                <div className={s.theme_author}>Автор - {props.theme.user.name}</div>
                {!props.hasPermissions &&
                    <div className={s.button_wrapper}>
                        <button className={s.save_button} onClick={saveTheme} name="save_button">Сохранить</button>
                    </div>
                }
            </div>
        </li>
    )
}

export default ThemeItem;
