import { Link } from 'react-router-dom';
import CrossButton from '../../../components/CrossButton/CrossButton';
import s from './ThemeItem.module.css'

function ThemeItem(props) {


    return (
        <li className={s.theme_item}>
            <Link className={s.theme_title} to={`/themes/${props.theme.id}`}>{props.theme.title}</Link>
            <CrossButton onClick={() => props.deleteTheme(props.theme.id)} />
        </li >
    );
}

export default ThemeItem;
