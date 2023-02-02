import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessages } from "../../../store/Error/ErrorSlice";

import { createTheme, deleteTheme, fetchSavedThemes } from "../../../store/Settings/ActionCreators";

import ThemeItem from "../ThemeItem/ThemeItem";
import s from './SavedThemes.module.css'

const SavedThemes = () => {
    const dispatch = useDispatch();
    const effectRan = useRef(false);

    const { savedThemes, isLoading, errors } = useSelector(state => state.savedThemesReducer);

    const [title, setTitle] = useState('');
    const [isFormShown, setIsFormShown] = useState(false);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchSavedThemes());
        }

        if (errors) {
            dispatch(showMessages(errors));
        }

        return () => {
            effectRan.current = true;
        }
    }, [isLoading]);

    const deleteThemeWrapper = (themeId) => {
        dispatch(deleteTheme(themeId));
        if (!isLoading && errors) {
            dispatch(showMessages(errors));
        }
    }

    const createThemeWrapper = (e) => {
        if (e.keyCode === 13) {
            dispatch(createTheme(title));
            setIsFormShown(false);
            setTitle('');
        }
    }

    return (
        <div className={s.saved_themes}>
            <h1 className={s.saved_themes__title}>Сохраненные темы</h1>
            {!isLoading &&
                <ul className={s.saved_themes__list}>
                    {savedThemes.map((item) =>
                        (<ThemeItem deleteTheme={deleteThemeWrapper} key={item.id} theme={item} />))
                    }
                    {isFormShown &&
                        <div className={s.new_theme}>
                            <span className={s.new_theme__before}>-</span>
                            <input autoFocus className={s.new_theme__form} onKeyDown={e => createThemeWrapper(e)}
                                onChange={e => setTitle(e.target.value)} value={title} />
                        </div>
                    }
                </ul>
            }
            <button className={s.add_theme__button} type="button" onClick={() => setIsFormShown(!isFormShown)}>
                Добавить
            </button>
        </div>

    );
}

export default SavedThemes;
