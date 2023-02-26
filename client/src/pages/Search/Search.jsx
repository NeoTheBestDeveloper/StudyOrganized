import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showMessages } from '../../store/Error/Slices/ErrorSlice';
import { searchThemes } from '../../store/Search/AsyncActionCreators';

import ThemeItem from './ThemeItem/ThemeItem';

import s from './Search.module.css';

function Search() {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userReducer);
    const { searchedThemes, isFetching, errors } = useSelector(state => state.searchReducer);

    const [searchInTitle, setSearchInTitle] = useState('Везде');
    const [orderAcsending, setOrderAcsending] = useState('Сначала новые');

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
                    {/* <div className={s.search_in}> */}
                    {/*     <div className={s.search_in__title}>{searchInTitle}</div> */}
                    {/*     <ul className={s.search_in__list}> */}
                    {/*         <li className={s.search_in__item}>Везде</li> */}
                    {/*         <li className={s.search_in__item}>В заголовке</li> */}
                    {/*         <li className={s.search_in__item}>В описании</li> */}
                    {/*     </ul> */}
                    {/* </div> */}
                    {/* <div className={s.order_acsending}> */}
                    {/*     <div className={s.order_acsending__title}>{orderAcsending}</div> */}
                    {/*     <ul className={s.order_acsending__list}> */}
                    {/*         <li className={s.order_acsending__item}>Сначала новые</li> */}
                    {/*         <li className={s.order_acsending__item}>Сначала старые</li> */}
                    {/*     </ul> */}
                    {/* </div> */}
                    <button className={s.search_btn} onClick={searchThemesWrapper} >
                        Поиск
                    </button>
                </div >
                <div className={s.search_bottom}>
                    {(!isFetching && searchedThemes) &&
                        <ul className={s.search_results}>
                            {searchedThemes.map((item) =>
                                <ThemeItem key={item.id} theme={item} hasPermissions={user.id === item.user.id} />
                            )}
                        </ul>
                    }
                </div>

            </div >
        </main >
    );
}

export default Search;
