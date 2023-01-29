import SavedThemes from './SavedThemes/SavedThemes';
import ShownThemes from './ShownThemes/ShownThemes';

import s from './Settings.module.css';

function Settings() {
    return (
        <div className={s.settings}>
            <SavedThemes />
            <ShownThemes />
        </div>
    );
}

export default Settings;
