import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTheme } from '../../store/Theme/ActionCreators';

import ThemeContent from './ThemeContent/ThemeContent';
import Resources from './Resources/Resources';

import s from './Theme.module.css';

function Theme() {
    const dispatch = useDispatch();
    const effectRan = useRef(false);
    const { id } = useParams();

    const { user } = useSelector(state => state.userReducer);
    const { isLoading, theme, errors } = useSelector(state => state.themeReducer);
    const { savedThemes } = useSelector(state => state.savedThemesReducer);

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
            {!isLoading && <>
                <ThemeContent hasPermissions={hasPermissions()} />
                {/* <Resources hasPermissions={hasPermissions()} /> */}
            </>
            }
        </main >
    );
}

export default Theme;
