import { Link } from 'react-router-dom';

import CrossButton from '../../../components/CrossButton/CrossButton';

import s from './ThemeItem.module.css'

function ThemeItem({ theme, deleteTheme }) {
    return (
        <li className={s.theme_item}>
            <Link className={s.theme_title} to={`/themes/${theme.id}`}>{theme.title}</Link>
            <CrossButton onClick={() => deleteTheme(theme.id)} />
        </li >
    );
}

export default ThemeItem;
