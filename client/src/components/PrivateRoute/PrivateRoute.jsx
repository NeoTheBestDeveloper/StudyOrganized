import { Navigate } from 'react-router-dom';
import { authAPI } from '../../api/Auth';


const PrivateRoute = ({ children }) => {
    const { isLoading, error } = authAPI.useGetMeQuery();

    if (isLoading) {
        return;
    }

    return error ? <Navigate to='/login' /> : children;
}

export default PrivateRoute;
