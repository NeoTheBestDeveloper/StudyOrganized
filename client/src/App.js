import logo from './logo.svg';
import { getUsers } from './api/api.js'
import './App.css';

function App() {
    return (
        <button onClick={() => getUsers()}>Get users</button>
    );
}

export default App;
