import { Link } from 'react-router-dom';
import CrossButton from '../../../../components/CrossButton/CrossButton';

import s from './ResourceItem.module.css';

function ResourceItem(props) {
    return (
        <li className={s.resource_item}>
            <Link className={s.resource_title} to={`/resources/${props.id}`}>{props.title}</Link>
            {props.hasPermissions &&
                <CrossButton onClick={() => props.deleteResource(props.id)} />
            }
        </li>
    )
}

export default ResourceItem;
