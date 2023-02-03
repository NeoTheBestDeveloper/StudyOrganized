import { useState, useLayoutEffect, useRef } from "react";


import s from './ResourceContent.module.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateResource } from "../../../store/Resource/ActionCreators";

const MIN_TEXTAREA_HEIGHT = 16;

const autoHeightArea = (titleRef, descriptionRef) => {
    titleRef.current.style.height = "inherit";
    descriptionRef.current.style.height = "inherit";

    titleRef.current.rows = 1;
    titleRef.current.style.height = `${Math.max(titleRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
    descriptionRef.current.style.height = `${Math.max(descriptionRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
}

const ResourceContent = ({ resource, hasPermission, themeTitle, isEditing }) => {
    const dispatch = useDispatch();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState(resource.title);
    const [description, setDescription] = useState(resource.description);
    const [isEdited, setIsEdited] = useState(false);

    useLayoutEffect(() => {
        autoHeightArea(titleRef, descriptionRef);
    });

    const updateTitleValue = (e) => {
        if (hasPermission) {
            setTitle(e.target.value);
            if (!isEdited) {
                setIsEdited(true);
            }
        }
    }

    const updateDescriptionValue = (e) => {
        if (hasPermission) {
            setDescription(e.target.value);
            if (!isEdited) {
                setIsEdited(true);
            }
        }
    }

    const updateResourceWrapper = () => {
        dispatch(updateResource(resource.id, title, description));
        if (!isEditing) {
            setIsEdited(false);
        }
    }

    return (
        <div className={s.resource_content}>
            <textarea className={s.resource_title} value={title} onChange={updateTitleValue} ref={titleRef} disabled={!hasPermission} />
            <div className={s.theme_title}>
                <span>Тема - </span>
                <Link to={`/themes/${resource.theme_id}`} className={s.goToTheme_btn} >{themeTitle}</Link>
            </div>
            <textarea className={s.resource_description} value={description === null ? '' : description} onChange={updateDescriptionValue}
                ref={descriptionRef} disabled={!hasPermission} />
            {(isEdited && hasPermission) && <button className={s.save_resource__btn} onClick={updateResourceWrapper}>Сохранить изменения</button>}
        </div>

    );
}


export default ResourceContent;
