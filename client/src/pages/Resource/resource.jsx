import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { getResourceAPI } from '../../api/api';
import Navbar from '../../components/Navbar';

import s from './resource.module.css';

function Resource() {
    const effectRan = useRef(false);
    const [resource, setResource] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (!effectRan.current) {
            const getResource = async () => {
                await getResourceAPI(location.state.resourceId).then((res) => {
                    setResource(res.data['resource']);
                });
            }

            getResource();
        }

        return () => {
            effectRan.current = true;
        }
    });

    return (
        <main className={s.resource}>
            <Navbar />
            <h1 className={s.resource_title}>{resource.title}</h1>
            <div className={s.short_description}>
                <p className={s.short_description__text}>{resource.short_description}</p>
                <button className={s.short_description__btn}>Изменить</button>
            </div>
            <div className={s.full_description}>
                <h2 className={s.full_description__title}>Описание</h2>
                <p className={s.full_description__text}>{resource.full_description}</p>
                <button className={s.resources_btn}>Изменить</button>
            </div >
        </main>
    );
}

export default Resource;
