import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showMessages } from '../../store/Error/ErrorSlice';
import { searchThemes } from '../../store/Search/ActionCreators';

import ThemeItem from './ThemeItem/ThemeItem';

import s from './Search.module.css';

function Search() {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userReducer);
    const { searchedThemes, isFetching, errors } = useSelector(state => state.searchReducer);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (errors.length) {
            dispatch(showMessages(errors));
        }
    }, [errors, dispatch]);

    const searchThemesWrapper = () => {
        dispatch(searchThemes(searchValue));
        setSearchValue('');
    }

    return (
        <main className={s.search}>
            <div className={s.search_wrapper}>
                <div className={s.search_top}>
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Введите название темы для поиска...' className={s.search_input} />
                    <button className={s.search_btn} onClick={searchThemesWrapper} >
                        Поиск
                    </button>
                </div>
                <div className={s.search_bottom}>
                    {(!isFetching && searchedThemes) &&
                        <ul className={s.search_results}>
                            {searchedThemes.map((item) =>
                                <ThemeItem key={item.id} theme={item} hasPermissions={user.id === item.user.id} />
                            )}
                        </ul>
                    }
                </div>

            </div>
        </main >
    );
}

export default Search;
