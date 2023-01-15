import { useState } from 'react';
import { addResourceAPI } from '../../api/api';

import s from './theme.module.css';

function ResourceAddForm(props) {
    const [resourceTitle, setResourceTitle] = useState('');
    const [shortDescr, setShortDescr] = useState('');
    const [fullDescr, setFullDescr] = useState('');

    const addResource = async (e) => {
        e.preventDefault();
        await addResourceAPI(props.themeId, resourceTitle, shortDescr, fullDescr).then((res) => {
            props.setShowForm(false);
            props.setResources([...props.resources, res.data]);
        });
    }

    return (
        <div className={s.resource_add}>
            <form className={s.resource_add__form}>
                <input placeholder='Название' type="text" className={s.title}
                    value={resourceTitle} onChange={e => setResourceTitle(e.target.value)} required />
                <textarea placeholder='Короткое описание' type="text" className={s.short_description}
                    value={shortDescr} onChange={e => setShortDescr(e.target.value)} />
                <textarea placeholder='Полное описание' type="text" className={s.full_description}
                    value={fullDescr} onChange={e => setFullDescr(e.target.value)} />
                <button type='submit' className={s.add_resource_btn} onClick={e => addResource(e)}>Сохранить</button>
            </form>
        </div>
    );
}

export default ResourceAddForm;
