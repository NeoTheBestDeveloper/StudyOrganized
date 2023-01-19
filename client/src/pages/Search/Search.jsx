import { useState } from 'react';

import { themeAPI } from '../../api/Themes';

import Navbar from '../../components/Navbar/Navbar';
import ThemeItem from './ThemeItem';
import s from './Search.module.css';
import { useSelector } from 'react-redux';

function Search() {
    const [trigger, result] = themeAPI.useLazySearchThemesQuery();
    const [searchValue, setSearchValue] = useState('');
    const { user } = useSelector(state => state.auth);

    const getFilteredThemes = async () => {
        await trigger(searchValue);
        setSearchValue('');
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
                    {result.currentData &&
                        <ul className={s.search_results}>
                            {result.data.map((item) =>
                                <ThemeItem key={item.id} theme={item} hasPermissions={user.id === item.user.id} />
                            )}
                        </ul>
                    }
                </div>

            </div>
        </main>
    );
}

export default Search;
