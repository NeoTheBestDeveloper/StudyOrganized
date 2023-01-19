import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { themeAPI } from "../../api/Themes";
import { resourceApi } from '../../api/Resources';

import Navbar from '../../components/Navbar/Navbar';
import ResourceItem from './ResourceItem';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ThemeContent from './ThemeContent';

import s from './Theme.module.css';

function Theme() {
    const location = useLocation();
    const [isFormShown, setIsFormShown] = useState(false);
    const { user } = useSelector(state => state.auth);

    const { data, error, isLoading } = themeAPI.useFetchThemeQuery(location.state.themeId);
    const resourcesStatus = resourceApi.useFetchThemeResourcesQuery(location.state.themeId);
    const [createResource] = resourceApi.useCreateResourceMutation();

    const [deleteResourceAPI] = resourceApi.useDeleteResourceMutation();

    const [saveThemeAPI] = themeAPI.useSaveThemeMutation();

    const deleteResource = async (resourceId) => {
        const { data, error } = await deleteResourceAPI(resourceId);
    }

    const addArticle = async (title, description) => {
        await createResource({ theme_id: location.state.themeId, title, description });
    }

    const hasPermissions = () => {
        return (user.id === data.user.id);
    }

    const saveTheme = async () => {
        const { data, error } = await saveThemeAPI(location.state.themeId);
    }

    return (
        <main className={s.theme}>
            <Navbar />

            {isFormShown &&
                <ArticleForm setIsFormShown={setIsFormShown} addArticle={addArticle} />
            }

            {!isLoading &&
                <ThemeContent hasPermissions={hasPermissions()} title={data.title} description={data.description} id={location.state.themeId} />
            }

            {(!resourcesStatus.isLoading && !isLoading) &&
                < div className={s.resources}>
                    <h2 className={s.resources_title}>Ресурсы</h2>
                    <ul className={s.resources_list}>
                        {resourcesStatus.data.map(
                            (item) => <ResourceItem title={item.title} id={item.id} key={item.id}
                                deleteResource={deleteResource} theme={data} hasPermissions={hasPermissions()} />
                        )}
                    </ul>
                    {hasPermissions() &&
                        <button className={s.resources_add__btn} onClick={() => setIsFormShown(!isFormShown)}>
                            Добавить
                        </button>

                    }
                    {!hasPermissions() &&
                        <button className={s.resources_add__btn} onClick={saveTheme}>
                            Сохранить
                        </button>
                    }
                </div>
            }
        </main >
    );
}

export default Theme;
