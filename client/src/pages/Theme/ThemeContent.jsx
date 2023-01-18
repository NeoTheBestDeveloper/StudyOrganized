import { useLayoutEffect, useRef, useState } from 'react';
import { themeAPI } from '../../api/Themes';

import s from './ThemeContent.module.css';

const MIN_TEXTAREA_HEIGHT = 16;

const ThemeContent = (props) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [isEdited, setIsEdited] = useState(false);

    const [updateThemeAPI] = themeAPI.useUpdateThemeMutation();

    useLayoutEffect(() => {
        titleRef.current.style.height = "inherit";
        descriptionRef.current.style.height = "inherit";

        titleRef.current.style.height = `${Math.max(
            titleRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
        descriptionRef.current.style.height = `${Math.max(
            descriptionRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    });

    const updateTheme = async () => {
        const { data, error } = await updateThemeAPI({
            newTheme: { title, description },
            themeId: props.id,
        });
    }


    return (
        <div className={s.theme_content}>
            <textarea className={s.theme_title} value={title}
                onChange={e => {
                    setTitle(e.target.value);
                    if (!isEdited) {
                        setIsEdited(true);
                    }
                }} ref={titleRef} />
            <textarea className={s.theme_description} value={description}
                onChange={e => {
                    setDescription(e.target.value);
                    if (!isEdited) {
                        setIsEdited(true);
                    }
                }} ref={descriptionRef} />
            {isEdited && <button className={s.udpdate_theme__btn} onClick={updateTheme}>Сохранить изменения</button>}
        </div>
    );
}

export default ThemeContent;
