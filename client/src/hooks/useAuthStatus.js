import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        setIsAuth(auth.isAuth);
        setIsLoading(auth.isLoading);
    }, [auth?.isAuth, auth?.isLoading]);

    return { isAuth, isLoading };
}

