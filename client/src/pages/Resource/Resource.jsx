import { useLocation } from 'react-router-dom';
import { resourceApi } from '../../api/Resources';

import Navbar from '../../components/Navbar/Navbar';

import s from './Resource.module.css';

function Resource() {
    const location = useLocation();
    const { data, isLoading, error } = resourceApi.useFetchResourceQuery(location.state.resourceId);

    return (
        <main className={s.resource}>
            <Navbar />
            {!isLoading &&
                <div className={s.resource_content}>
                    <input className={s.resource_title} value={data.title} />
                    <div className={s.short_description}>
                        <input className={s.short_description__text} value={data.description} />
                    </div>
                </div>
            }
        </main>
    );
}

export default Resource;
