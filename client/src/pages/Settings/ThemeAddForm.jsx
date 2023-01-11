import { useState } from 'react';
import { addThemeAPI } from '../../api/api';

import s from './theme_add_form.module.css'

function ThemeAddForm(props) {
    const [themeTitle, setThemeTitle] = useState('');
    const [shortDescr, setShortDescr] = useState('');
    const [fullDescr, setFullDescr] = useState('');

    const addTheme = async (e) => {
        e.preventDefault();
        let res = await addThemeAPI(themeTitle, shortDescr, fullDescr);
        props.setShowForm(false);
        props.setSavedThemes([...props.savedThemes, res]);
    }

    return (
        <div className={s.theme_add}>
            <form className={s.theme_add__form}>
                <input placeholder='Название' type="text" className={s.title}
                    value={themeTitle} onChange={e => setThemeTitle(e.target.value)} required />
                <textarea placeholder='Короткое описание' type="text" className={s.short_description}
                    value={shortDescr} onChange={e => setShortDescr(e.target.value)} />
                <textarea placeholder='Полное описание' type="text" className={s.full_description}
                    value={fullDescr} onChange={e => setFullDescr(e.target.value)} />
                <button type='submit' className={s.add_theme_btn} onClick={e => addTheme(e)}>Сохранить</button>
            </form>
        </div>
    );
}

export default ThemeAddForm;
