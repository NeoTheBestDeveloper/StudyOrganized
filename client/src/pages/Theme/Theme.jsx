import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTheme } from '../../store/Theme/ActionCreators';

import ThemeContent from './ThemeContent/ThemeContent';
import Resources from './Resources/Resources';

import s from './Theme.module.css';
import { showMessages } from '../../store/Error/ErrorSlice';

function Theme() {
    const dispatch = useDispatch();
    const effectRan = useRef(false);
    const { id } = useParams();

    const { user } = useSelector(state => state.userReducer);
    const { isFetching, isEditing, theme, errors } = useSelector(state => state.themeReducer);
    const { savedThemes } = useSelector(state => state.savedThemesReducer);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchTheme(id, savedThemes, []));
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        return () => {
            effectRan.current = true;
        }
    }, [isFetching, isEditing]);

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
