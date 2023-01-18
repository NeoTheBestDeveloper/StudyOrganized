import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import ResourceItem from './ResourceItem';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import s from './Theme.module.css';
import { themeAPI } from "../../api/Themes";
import { resourceApi } from '../../api/Resources';
import ThemeContent from './ThemeContent';

function Theme() {
    const location = useLocation();
    const [isFormShown, setIsFormShown] = useState(false);

    const { data, error, isLoading } = themeAPI.useFetchThemeQuery(location.state.themeId);
    const resourcesStatus = resourceApi.useFetchThemeResourcesQuery(location.state.themeId);
    const [createResource] = resourceApi.useCreateResourceMutation();

    const [deleteResourceAPI] = resourceApi.useDeleteResourceMutation();

    const deleteResource = async (resourceId) => {
        const { data, error } = await deleteResourceAPI(resourceId);
    }

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
                <ThemeContent title={data.title} description={data.description} id={location.state.themeId} />
            }

            {!resourcesStatus.isLoading &&
                < div className={s.resources}>
                    <h2 className={s.resources_title}>Ресурсы</h2>
                    <ul className={s.resources_list}>
                        {resourcesStatus.data.map(
                            (item) => <ResourceItem title={item.title} id={item.id} key={item.id} deleteResource={deleteResource} />
                        )}
                    </ul>
                    <button className={s.resources_add__btn} onClick={() => setIsFormShown(!isFormShown)}>
                        Добавить
                    </button>
                </div>
            }
        </main >
    );
}

export default Theme;
