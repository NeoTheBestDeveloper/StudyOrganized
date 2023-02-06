import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { showMessages } from '../../../store/Error/Slices/ErrorSlice';
import { showNewResourceForm } from '../../../store/Theme/Slices/ResourcesSlice';
import { createResource, deleteResource, fetchThemeResources } from '../../../store/Theme/AsyncActionCreators';

import ResourceItem from './ResourceItem/ResourceItem';

import s from './Resources.module.css';

const Resources = ({ hasPermissions }) => {
    const dispatch = useDispatch();
    const effectRan = useRef(false);

    const themeId = useParams().id;

    const { resources, isFetching, isEditing, errors, isNewResourceFormShown } = useSelector(state => state.resourcesReducer);

    const [title, setTitle] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchThemeResources(themeId));
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        if (isEdited && !isEditing) {
            setTitle('');
            setIsEdited(false);
        }

        return () => {
            effectRan.current = true;
        }
    }, [isFetching, isEditing, dispatch, errors, themeId, isEdited]);


    const createResourceWrapper = (e) => {
        if (e.keyCode === 13) {
            dispatch(createResource(themeId, title));
        }
    }

    const deleteResourceWrapper = (id) => {
        dispatch(deleteResource(id));
    }

    return (
        < div className={s.resources}>
            <h2 className={s.resources_title}>Ресурсы</h2>
            <ul className={s.resources_list}>
                {resources.map(
                    (item) => <ResourceItem key={item.id} deleteResource={deleteResourceWrapper} hasPermissions={hasPermissions} resource={item} />
                )}
                {isNewResourceFormShown &&
                    <div className={s.new_resource}>
                        <span className={s.new_resource__before}>- </span>
                        <input autoFocus className={s.new_resource__form} onKeyDown={e => createResourceWrapper(e)}
                            onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                }
            </ul>

            {hasPermissions &&
                <button className={s.resources_add__btn} onClick={() => {
                    dispatch(showNewResourceForm());
                    setIsEdited(true);
                }
                }>
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
