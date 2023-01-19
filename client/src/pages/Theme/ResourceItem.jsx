import { useNavigate } from 'react-router-dom';

import s from './ResourceItem.module.css';

function ResourceItem(props) {
    const navigate = useNavigate();

    const gotToResource = () => {
        navigate('/resource', {
            state: {
                resourceId: props.id,
                currentTheme: props.theme,
            }
        });
    };

    return (
        <li className={s.resource_item}>
            <button className={s.resource_title} onClick={gotToResource}>{props.title}</button>
            {props.hasPermissions &&
                <button type="button" className={s.cross_button} onClick={() => props.deleteResource(props.id)}>
                    <img src="assets/cross.svg" alt="Крестик" />
                </button>
            }
        </li>
    )
}

export default ResourceItem;
