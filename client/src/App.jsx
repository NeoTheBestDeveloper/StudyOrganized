import Main from './pages/Main/main';
import Auth from './pages/Auth/auth';
import Profile from './pages/Profile/profile';
import Resource from './pages/Resource/resource';
import Search from './pages/Search/search';
import Settings from './pages/Settings/settings';
import Tasks from './pages/Tasks/tasks';
import Theme from './pages/Theme/theme';

import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/resource" element={<Resource />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/theme" element={<Theme />} />
            </Routes>
        </div >
    );
}

export default App;
