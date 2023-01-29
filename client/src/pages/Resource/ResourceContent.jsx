import { useNavigate } from "react-router-dom";
import { useState, useLayoutEffect, useRef } from "react";

/* import { resourceApi } from "../../api/Resources"; */

import s from './ResourceContent.module.css';
import { useSelector } from "react-redux";

const MIN_TEXTAREA_HEIGHT = 16;

const ResourceContent = (props) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState(props.resource.title);
    const [description, setDescription] = useState(props.resource.description);
    const [isEdited, setIsEdited] = useState(false);

    /* const [updateResourceAPI] = resourceApi.useUpdateResourceMutation(); */
    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        titleRef.current.style.height = "inherit";
        descriptionRef.current.style.height = "inherit";

        titleRef.current.rows = 1;
        titleRef.current.style.height = `${Math.max(titleRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
        descriptionRef.current.style.height = `${Math.max(descriptionRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
    });

    /* const updateResource = async () => { */
    /*     const { isLoading } = await updateResourceAPI({ */
    /*         resourceId: props.resource.id, */
    /*         newResource: { */
    /*             title, */
    /*             description, */
    /*             theme_id: props.theme.id, */
    /*             id: props.resource.id, */
    /*         }, */
    /*     }); */
    /**/
    /*     if (!isLoading) { */
    /*         setIsEdited(false) */
    /*     } */
    /* } */

    const goToTheme = () => {
        navigate('/theme', { state: { themeId: props.theme.id } })
    }

    const hasPermission = () => {
        return (user.id === props.resource.user_id);
    }

    return (
        <div className={s.resource_content}>
            <textarea className={s.resource_title} value={title} onChange={(e) => {
                if (hasPermission()) {
                    setTitle(e.target.value);
                    if (!isEdited) setIsEdited(true);
                }
            }} ref={titleRef} disabled={!hasPermission()} />
            <div className={s.theme_title}>
                <span>Тема - </span>
                <button type="button" className={s.goToTheme_btn} onClick={goToTheme}>{props.theme.title}</button>
            </div>
            <textarea className={s.resource_description} value={description} onChange={(e) => {
                if (hasPermission()) {
                    setDescription(e.target.value);
                    if (!isEdited) setIsEdited(true);
                }
            }} ref={descriptionRef} disabled={!hasPermission()} />
            {/* {(isEdited && hasPermission()) && <button className={s.save_resource__btn} onClick={updateResource}>Сохранить изменения</button>} */}
        </div>

    );
}


export default ResourceContent;
