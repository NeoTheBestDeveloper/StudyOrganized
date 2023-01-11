import { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import s from './settings.module.css';
import ThemeListItem from './ThemeListItem';
import ThemeAddForm from './ThemeAddForm';
import { getThemesAPI } from '../../api/api';

function Settings() {
    const [savedThemes, setSavedThemes] = useState([]);
    const [shownThemes, setShownThemes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchThemes = async () => {
            let themes = await getThemesAPI();
            setSavedThemes([...savedThemes, ...themes['themes']]);
        }
        fetchThemes();
    }, []
    );

    const showAddThemeForm = () => {
        setShowForm(!showForm);
    }

    return (
        <div className={s.settings}>
            <Navbar />
            {showForm
                ? <ThemeAddForm setShowForm={setShowForm} setSavedThemes={setSavedThemes}
                    savedThemes={savedThemes} />
                : <div></div>}
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
