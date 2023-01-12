import { useEffect, useRef, useState } from 'react';

import { getThemesAPI } from '../../api/api';
import Navbar from '../../components/Navbar';
import ThemeListItem from './ThemeListItem';
import ThemeAddForm from './ThemeAddForm';

import s from './settings.module.css';

function Settings() {
    const effectRan = useRef(false);
    const [savedThemes, setSavedThemes] = useState([]);
    const [shownThemes, setShownThemes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!effectRan.current) {
            const getThemes = async () => {
                await getThemesAPI().then((res) => {
                    setSavedThemes([...savedThemes, ...res.data['themes']]);
                });
            }
            getThemes();
        }

        return () => {
            effectRan.current = true;
        }
    }, []);

    const showAddThemeForm = () => {
        setShowForm(!showForm);
    }

    return (
        <div className={s.settings}>
            <Navbar />
            {showForm &&
                <ThemeAddForm setShowForm={setShowForm} setSavedThemes={setSavedThemes}
                    savedThemes={savedThemes} />
            }
            <div className={s.saved_themes}>
                <h1 className={s.saved_themes__title}>Сохраненные темы</h1>
                <ul className={s.saved_themes__list}>
                    {savedThemes.map((item) => (<ThemeListItem key={item.id} id={item.id} title={item.title} />))}
                </ul>
                <button className={s.add_theme__button} type="button" onClick={showAddThemeForm}>Добавить</button>
            </div>
            <div className={s.show_themes}>
                <h1 className={s.shown_themes__title}>Показывать статистику по</h1>
                <ul className={s.shown_themes__list}>
                    {shownThemes.map((item) => (<ThemeListItem key={item.id} id={item.id} title={item.title} />))}
                </ul>
                <button className={s.add_theme__button} type="button">Добавить</button>
            </div>
        </div>
    );
}

export default Settings;
