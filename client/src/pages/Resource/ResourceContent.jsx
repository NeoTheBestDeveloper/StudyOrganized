import { Link, useNavigate } from "react-router-dom";
import { useState, useLayoutEffect, useRef } from "react";

import { resourceApi } from "../../api/Resources";

import s from './ResourceContent.module.css';

const MIN_TEXTAREA_HEIGHT = 16;

const ResourceContent = (props) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [isEdited, setIsEdited] = useState(false);

    const [updateResourceAPI] = resourceApi.useUpdateResourceMutation();

    const navigate = useNavigate();

    useLayoutEffect(() => {
        titleRef.current.style.height = "inherit";
        descriptionRef.current.style.height = "inherit";

        titleRef.current.rows = 1;
        titleRef.current.style.height = `${Math.max(
            titleRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )
            }px`;
        descriptionRef.current.style.height = `${Math.max(
            descriptionRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )
            } px`;
    });

    const updateResource = async () => {
        const { isLoading } = await updateResourceAPI({
            resourceId: props.id,
            newResource: {
                title,
                description,
                theme_id: props.theme_id,
                id: props.id,
            },
        });
        if (!isLoading) {
            setIsEdited(false)
        }
    }

    const goToTheme = () => {
        navigate('/theme', { state: { themeId: props.theme.id } })
    }

    return (
        <div className={s.resource_content}>
            <textarea className={s.resource_title} value={title} onChange={(e) => {
                setTitle(e.target.value);
                if (!isEdited) setIsEdited(true);
            }} ref={titleRef} />
            <div className={s.theme_title}>
                <span>Тема - </span>
                <button type="button" className={s.goToTheme_btn} onClick={goToTheme}>{props.theme.title}</button>
            </div>
            <textarea className={s.resource_description} value={description} onChange={(e) => {
                setDescription(e.target.value);
                if (!isEdited) setIsEdited(true);
            }} ref={descriptionRef} />
            {isEdited && <button className={s.save_resource__btn} onClick={updateResource}>Сохранить изменения</button>}
        </div>

    );
}


export default ResourceContent;
