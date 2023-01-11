import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuth } = useContext(AuthContext);

    if (isAuth === null) {
        return;
    }

    return isAuth ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
