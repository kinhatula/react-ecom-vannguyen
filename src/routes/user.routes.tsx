import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { useEffect } from 'react';
import authApi from '@/apis/authApi';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/user/user.slice';

function UserRoutes() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['me'],
        queryFn: () => authApi.getMe()
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setUser({
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                avatar: data?.avatar,
                role: data?.role
            })
        );
    }, [dispatch, data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error...</div>;
    }

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default UserRoutes;
