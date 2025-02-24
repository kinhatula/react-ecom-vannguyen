import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { useEffect } from 'react';
import { setUser } from '@/redux/user/user.slice';
import useGetMeQuery from '@/hooks/useGetMeQuery';
import { useAppDispatch } from '@/redux/hook';

function UserRoutes() {
    const { data, isLoading, error } = useGetMeQuery();
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
