import { Link } from 'react-router-dom';
import CrossButton from '../../../../components/CrossButton/CrossButton';

import s from './ResourceItem.module.css';

function ResourceItem({ hasPermissions, resource, deleteResource }) {
    return (
        <li className={s.resource_item}>
            <Link className={s.resource_title} to={`/resources/${resource.id}`}>{resource.title}</Link>
            {hasPermissions &&
                <CrossButton onClick={() => deleteResource(resource.id)} />
            }
        </li>
    )
}

export default ResourceItem;
