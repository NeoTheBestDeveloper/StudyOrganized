import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createResource, deleteResource } from '../../../store/Theme/ActionCreators';

import ResourceItem from './ResourceItem/ResourceItem';

import s from './Resources.module.css';

const Resources = ({ hasPermissions }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);

    const [isFormShown, setIsFormShown] = useState(false);
    const [title, setTitle] = useState('');

    const deleteResourceWrapper = (id) => {
        dispatch(deleteResource(id));
    }

    const createResourceWrapper = (e) => {
        if (e.keyCode === 13) {
            dispatch(createResource(theme.id, title));
            setIsFormShown(false);
            setTitle('');
        }
    }

    return (
        < div className={s.resources}>
            <h2 className={s.resources_title}>Ресурсы</h2>
            <ul className={s.resources_list}>
                {theme.resources.map(
                    (item) => <ResourceItem title={item.title} id={item.id} key={item.id}
                        deleteResource={deleteResourceWrapper} theme={theme} hasPermissions={hasPermissions} />
                )}
                {isFormShown &&
                    <div className={s.new_theme}>
                        <span className={s.new_theme__before}>-</span>
                        <input autoFocus className={s.new_theme__form} onKeyDown={e => createResourceWrapper(e)}
                            onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                }
            </ul>

            {hasPermissions &&
                <button className={s.resources_add__btn} onClick={() => setIsFormShown(!isFormShown)}>
                    Добавить
                </button>
            }

            {/* {!hasPermissions && */}
            {/*     <button className={s.resources_add__btn} onClick={saveTheme}> */}
            {/*         Сохранить */}
            {/*     </button> */}
            {/* } */}
        </div>

    );
}

export default Resources;
