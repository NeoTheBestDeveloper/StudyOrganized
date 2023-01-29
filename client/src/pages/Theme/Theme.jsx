import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { fetchTheme } from '../../store/Theme/ActionCreators';

import ThemeContent from './ThemeContent/ThemeContent';
import Resources from './Resources/Resources';

import s from './Theme.module.css';

function Theme() {
    const effectRan = useRef(false);
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { isFetching, theme, error } = useSelector(state => state.theme);
    const { savedThemes } = useSelector(state => state.savedThemes);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchTheme(id, savedThemes, []));
        }

        return () => {
            effectRan.current = true;
        }
    }, []);

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
