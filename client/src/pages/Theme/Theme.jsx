import { useState } from 'react';
import { useLocation } from 'react-router-dom';


import Navbar from '../../components/Navbar/Navbar';
import ResourceItem from './ResourceItem';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import s from './Theme.module.css';
import { themeAPI } from "../../api/Themes";
import { resourceApi } from '../../api/Resources';

function Theme() {
    const location = useLocation();
    const [isFormShown, setIsFormShown] = useState(false);
    const { data, error, isLoading } = themeAPI.useFetchThemeQuery(location.state.themeId);
    const resourcesStatus = resourceApi.useFetchThemeResourcesQuery(location.state.themeId);
    const [createResource] = resourceApi.useCreateResourceMutation();

    const addArticle = async (title, description) => {
        await createResource({ theme_id: location.state.themeId, title, description });
    }


    return (
        <main className={s.theme}>
            <Navbar />
            {isFormShown &&
                <ArticleForm setIsFormShown={setIsFormShown} addArticle={addArticle} />
            }

            {!isLoading &&

                <div className={s.theme_content}>
                    <input className={s.title} value={data.title} />
                    <div className={s.description}>
                        <input className={s.description_text} value={data.description} />
                    </div>
                </div>
            }
            {!resourcesStatus.isLoading &&
                < div className={s.resources}>
                    <h2 className={s.resources_title}>Ресурсы</h2>
                    <ul className={s.resources_list}>
                        {resourcesStatus.data.map((item) => (<ResourceItem title={item.title} id={item.id} key={item.id} />))}
                    </ul>
                    <button className={s.resources_btn} onClick={() => setIsFormShown(!isFormShown)}>Добавить</button>
                </div>
            }
        </main >
    );
}

export default Theme;
