import { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';

import { getResourcesAPI, getThemeAPI } from "../../api/api";

import Navbar from '../../components/Navbar';
import ResourceAddForm from "./AddResourceForm";
import ResourceItem from "./ResourceItem";
import s from './theme.module.css';

function Theme() {
    const effectRan = useRef(false)

    const [theme, setTheme] = useState({});
    const [resources, setResources] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!effectRan.current) {
            const getTheme = async () => {
                await getThemeAPI(location.state.themeId).then((res) => {
                    setTheme(res.data['theme']);
                });
            }

            const getResources = async () => {
                await getResourcesAPI(location.state.themeId).then((res) => {
                    setResources([...resources, ...res.data['resources']]);
                });
            }

            getResources();
            getTheme();
        }

        return () => {
            effectRan.current = true;
        }
    });

    const showAddResourceForm = () => {
        setShowForm(!showForm);
    }

    return (
        <main className={s.theme}>
            <Navbar />
            {showForm &&
                <ResourceAddForm setShowForm={setShowForm} setResources={setResources}
                    resources={resources} themeId={location.state.themeId} />
            }
            <h1 className={s.theme_title}>{theme.title}</h1>
            <div className={s.short_description}>
                <p className={s.short_description__text}>{theme.short_description}</p>
                <button className={s.short_description__btn}>Изменить</button>
            </div>
            <div className={s.resources}>
                <h2 className={s.resources_title}>Ресурсы</h2>
                <ul className={s.resources_list}>
                    {resources.map((item) => (<ResourceItem title={item.title} id={item.id} key={item.id} />))}
                </ul>
                <button className={s.resources_btn} onClick={showAddResourceForm}>Добавить</button>
            </div>
            <div className={s.full_description}>
                <h2 className={s.full_description__title}>Описание</h2>
                <p className={s.full_description__text}>{theme.full_description}</p>
                <button className={s.resources_btn}>Изменить</button>
            </div >
        </main >
    );
}

export default Theme;
