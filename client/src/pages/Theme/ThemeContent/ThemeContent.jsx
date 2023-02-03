import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTheme } from '../../../store/Theme/ActionCreators';

import themeSlice from '../../../store/Theme/ThemeSlice';

import s from './ThemeContent.module.css';

const MIN_TEXTAREA_HEIGHT = 16;

const autoHeightAreas = (titleRef, descriptionRef) => {
    titleRef.current.style.height = "inherit";
    descriptionRef.current.style.height = "inherit";

    titleRef.current.rows = 1;
    titleRef.current.style.height = `${Math.max(
        titleRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
    )}px`;
    descriptionRef.current.style.height = `${Math.max(
        descriptionRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
    )}px`;
}

const ThemeContent = ({ hasPermissions }) => {
    const dispatch = useDispatch();

    const { theme, isEditing, errors } = useSelector(state => state.themeReducer);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState(theme.title);
    const [description, setDescription] = useState(theme.description);

    const [isEdited, setIsEdited] = useState(false);


    useLayoutEffect(() => {
        autoHeightAreas(titleRef, descriptionRef);
    });

    const updateThemeWrapper = async () => {
        dispatch(updateTheme(theme.id, title, description));
        if (!isEditing) {
            setIsEdited(false);
        }
    }

    const updateTitleValue = (e) => {
        if (hasPermissions) {
            setTitle(e.target.value);
            if (!isEdited) {
                setIsEdited(true);
            }
        }
    }

    const updateDescriptionValue = (e) => {
        if (hasPermissions) {
            setDescription(e.target.value);
            if (!isEdited) {
                setIsEdited(true);
            }
        }
    }

    return (
        <div className={s.theme_content}>
            <textarea className={s.theme_title} value={title}
                onChange={e => updateTitleValue(e)} ref={titleRef} disabled={!hasPermissions} />
            <textarea className={s.theme_description} value={description === null ? "" : description}
                onChange={e => updateDescriptionValue(e)} ref={descriptionRef} disabled={!hasPermissions} />
            {(isEdited && hasPermissions) &&
                <button className={s.udpdate_theme__btn} onClick={updateThemeWrapper}>
                    Сохранить изменения
                </button>
            }
        </div >
    );
}

export default ThemeContent;
