import { useLocation } from 'react-router-dom';
import { resourceApi } from '../../api/Resources';

import Navbar from '../../components/Navbar/Navbar';
import ResourceContent from './ResourceContent';

import s from './Resource.module.css';

function Resource() {
    const location = useLocation();
    const { data, isLoading, error } = resourceApi.useFetchResourceQuery(location.state.resourceId);

    return (
        <main className={s.resource}>
            <Navbar />
            {!isLoading && <ResourceContent title={data.title} description={data.description}
                id={data.id} theme_id={data.theme_id} />}
        </main>
    );
}

export default Resource;
