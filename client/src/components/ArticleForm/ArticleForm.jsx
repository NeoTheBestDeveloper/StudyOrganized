import { useState } from 'react';

import s from './ArticleForm.module.css'

function ThemeAddForm(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addArticle = async (e) => {
        e.preventDefault();
        props.addArticle(title, description);
        props.setIsFormShown(false);
    }

    return (
        <div className={s.article_form}>
            <form className={s.article_form__form} onSubmit={addArticle}>
                <input required placeholder='Название' type="text" className={s.title}
                    value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                <textarea placeholder='Описание' type="text" className={s.description}
                    value={description} onChange={e => setDescription(e.target.value)} />
                <button type='submit' className={s.article_form__btn}>Сохранить</button>
            </form>
        </div>
    );
}

export default ThemeAddForm;
