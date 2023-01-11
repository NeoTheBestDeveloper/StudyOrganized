import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getThemeAPI } from "../../api/api";

import Navbar from '../../components/Navbar';
import ResourceItem from "./ResourceItem";
import s from './theme.module.css';

function Theme() {
    const [theme, setTheme] = useState({});
    const [resources, setResources] = useState([{ id: 1, title: 'ресурс 1' }, { id: 2, title: 'ресурс 2' }]);
    const location = useLocation();

    useEffect(() => {
        const getTheme = async () => {
            let res = await getThemeAPI(location.state.themeId);
            setTheme(res);
        }
        getTheme();
    });

    return (
        <div className="theme">
            <Navbar />
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
                <button className={s.resources_btn}>Добавить</button>
            </div>
            <div className={s.full_description}>
                <h2 className={s.full_description__title}>Описание</h2>
                <p className={s.full_description__text}>{theme.full_description}</p>
                <button className={s.resources_btn}>Изменить</button>
            </div >
        </div >
    );
}

export default Theme;
