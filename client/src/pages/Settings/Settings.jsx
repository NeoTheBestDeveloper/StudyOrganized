import { useState } from 'react';

import { themeAPI } from '../../api/Themes';
import Navbar from '../../components/Navbar/Navbar';
import ThemeListItem from './ThemeListItem';
import ArticleForm from '../../components/ArticleForm/ArticleForm'

import s from './Settings.module.css';

function Settings() {
    const { data, error, isLoading } = themeAPI.useFetchSavedUserThemesQuery();
    const [createTheme] = themeAPI.useCreateThemeMutation();

    const [shownThemes, setShownThemes] = useState([]);
    const [isFormShown, setIsFormShown] = useState(false);

    const addArticle = async (title, description) => {
        await createTheme({ title, description });
    }

    return (
        <div className={s.settings}>
            <Navbar />
            {isFormShown &&
                <ArticleForm setIsFormShown={setIsFormShown} addArticle={addArticle} />
            }
            <div className={s.saved_themes}>
                <h1 className={s.saved_themes__title}>Сохраненные темы</h1>
                {!isLoading &&
                    <ul className={s.saved_themes__list}>
                        {data.map((item) => (<ThemeListItem key={item.id} id={item.id} title={item.title} />))}
                    </ul>
                }
                <button className={s.add_theme__button} type="button" onClick={() => setIsFormShown(!isFormShown)}>
                    Добавить
                </button>
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
