import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showMessages } from "../../../store/Error/Slices/ErrorSlice";
import { showNewThemeForm } from "../../../store/Settings/Slices/SavedThemesSlice";
import { createTheme, deleteTheme, fetchSavedThemes } from "../../../store/Settings/AsyncActionCreators";

import ThemeItem from "../ThemeItem/ThemeItem";
import s from './SavedThemes.module.css'

const SavedThemes = () => {
    const dispatch = useDispatch();
    const effectRan = useRef(false);

    const { savedThemes, isLoading, isNewThemeFormShown, isEditing, errors } = useSelector(state => state.savedThemesReducer);

    const [title, setTitle] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        if (!effectRan.current) {
            dispatch(fetchSavedThemes());
        }


        if (isEdited && !isEditing) {
            setTitle('');
            setIsEdited(false);
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        return () => {
            effectRan.current = true;
        }
    }, [isLoading, isEditing, dispatch, isEdited, errors]);

    const deleteThemeWrapper = (themeId) => {
        dispatch(deleteTheme(themeId));
    }

    const createThemeWrapper = (e) => {
        if (e.keyCode === 13) {
            dispatch(createTheme(title));
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
                    {isNewThemeFormShown &&
                        <div className={`${s.new_theme}`}>
                            <span className={s.new_theme__before}>- </span>
                            <input autoFocus className={s.new_theme__form} onKeyDown={e => createThemeWrapper(e)}
                                onChange={e => setTitle(e.target.value)} value={title} />
                        </div>
                    }
                </ul>
            }
            <button className={s.add_theme__button} type="button" onClick={() => {
                dispatch(showNewThemeForm());
                setIsEdited(true);
            }
            }>
                Добавить
            </button>
        </div>

    );
}

export default SavedThemes;
