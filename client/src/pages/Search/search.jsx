import { useState } from 'react';

import { filterThemesAPI } from '../../api/api';

import Navbar from '../../components/Navbar';
import ThemeItem from './ThemeItem';
import s from './search.module.css';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [themes, setThemes] = useState([]);

    const getFilteredThemes = async () => {
        await filterThemesAPI(searchValue).then((res) => {
            setSearchValue('');
            setThemes(res.data);
        });
    }

    return (
        <main className={s.search}>
            <Navbar />
            <div className={s.search_wrapper}>
                <div className={s.search_top}>
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Введите название темы для поиска...' className={s.search_input} />
                    <button className={s.search_btn} onClick={getFilteredThemes}>Поиск</button>
                </div>
                <div className={s.search_bottom}>
                    <ul className={s.search_results}>
                        {themes.map((item) => <ThemeItem key={item.id} theme={item} />)}
                    </ul>
                </div>

            </div>
        </main>
    );
}

export default Search;
