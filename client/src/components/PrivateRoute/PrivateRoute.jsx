import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const { isLoading, isAuth } = useSelector(state => state.authReducer);

    if (isLoading) {
        return;
    }

    return isAuth ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
