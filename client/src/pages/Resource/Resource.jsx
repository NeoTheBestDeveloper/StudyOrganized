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
            {!isLoading && <ResourceContent resource={data} theme={location.state.currentTheme} />}
        </main>
    );
}

export default Resource;
