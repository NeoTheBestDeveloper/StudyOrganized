import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showMessages } from '../../store/Error/Slices/ErrorSlice';
import { fetchResource } from '../../store/Resource/AsyncActionCreators';

import ResourceContent from './ResourceContent/ResourceContent';

import s from './Resource.module.css';

const Resource = () => {
    const effectRan = useRef(false);
    const dispatch = useDispatch();

    const { id } = useParams();
    const { resource, themeTitle, errors, isEditing, isFetching } = useSelector(state => state.resourceReducer);
    const { user } = useSelector(state => state.userReducer);

    const hasPermission = user.id === resource.user_id;

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchResource(id));
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        return () => {
            effectRan.current = true;
        }
    }, [isEditing, isFetching, dispatch, errors, id])

    return (
        <main className={s.resource}>
            {!isFetching && <ResourceContent resource={resource} hasPermission={hasPermission} themeTitle={themeTitle} isEditing={isEditing} />}
        </main>
    );
}

export default Resource;
