import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { clearUser, setUser } from '@/redux/user/user.slice';
import useGetMeQuery from '@/hooks/useGetMeQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
function useAuthenticate() {
    const { data, isLoading, error } = useGetMeQuery();
    const user = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && !user.isAuthenticated) {
            dispatch(
                setUser({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    avatar: data.avatar,
                    role: data.role
                })
            );
        }
    }, [dispatch, data, user.isAuthenticated]);

    useEffect(() => {
        if (!isLoading && !user.isAuthenticated && !data) {
            navigate('/sign-in');
        }
    }, [user, navigate, isLoading, data]);

    useEffect(() => {
        // console.log('check admin', data);
        if (data && user && user.isAuthenticated && user.user.role === 'USER') {
            navigate('/');
        }
    }, [data, user, navigate]);

    useEffect(() => {
        if (error) {
            dispatch(clearUser());
        }
    }, [error, dispatch]);
    return { isLoading, error };
}

export default useAuthenticate;
