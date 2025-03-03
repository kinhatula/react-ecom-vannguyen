import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import Header from '@components/Header';
import useAuthenticate from '@/hooks/useAuthenticate';

function UserRoutes() {
    const { isLoading, error } = useAuthenticate();

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
            {/* <Footer /> */}
        </div>
    );
}

export default UserRoutes;
