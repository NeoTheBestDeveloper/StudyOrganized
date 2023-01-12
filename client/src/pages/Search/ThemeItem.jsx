import { useNavigate } from 'react-router-dom'
import s from './search.module.css'

const ThemeItem = (props) => {
    const navigate = useNavigate();
    const goToTheme = () => {
        navigate('/theme', { state: { themeId: props.theme.id } })
    }
    return (
        <li className={s.theme_item} onClick={goToTheme}>
            <div className={s.theme_title}>{props.theme.title}</div>
            <div className={s.theme_text}>{props.theme.short_description}</div>
            <div className={s.button_wrapper}>
                <button className={s.save_button}>Сохранить</button>
            </div>
        </li>
    )
}

export default ThemeItem;
