import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showMessages } from '../../store/Error/Slices/ErrorSlice';
import { fetchTheme } from '../../store/Theme/AsyncActionCreators';

import ThemeContent from './ThemeContent/ThemeContent';
import Resources from './Resources/Resources';

import s from './Theme.module.css';

function Theme() {
    const dispatch = useDispatch();
    const effectRan = useRef(false);
    const { id } = useParams();

    const { user } = useSelector(state => state.userReducer);
    const { isFetching, isEditing, theme, errors } = useSelector(state => state.themeReducer);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchTheme(id));
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        return () => {
            effectRan.current = true;
        }
    }, [isFetching, isEditing, dispatch, id, errors]);

    const hasPermissions = () => {
        return (user.id === theme.user.id);
    }

    return (
        <main className={s.theme}>
            {!isFetching && <>
                <ThemeContent hasPermissions={hasPermissions()} />
                <Resources hasPermissions={hasPermissions()} />
            </>
            }
        </main >
    );
}

export default Theme;
