import { Outlet } from 'react-router-dom';

import useAuthenticate from '@/hooks/useAuthenticate';
import HeaderAdmin from '@/components/HeaderAdmin';
import SideBar from '@/components/Sidebar';

function AdminRoutes() {
    const { isLoading, error } = useAuthenticate();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>error...</div>;
    }

    return (
        <div>
            <HeaderAdmin />
            <SideBar />
            <Outlet />
        </div>
    );
}

export default AdminRoutes;
