import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//react router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import UserRoutes from '@/routes/user.routes.tsx';

import Toast from './components/Toast';

//redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

//tanstack query
import {
    QueryClientProvider,
    QueryClient,
    QueryCache,
    MutationCache
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from '@/components/Dashboard';
import AdminRoutes from '@/routes/admin.routes';
import CategoryAdminPage from '@/features/category/pages/CategoryAdminPage';
import SignUpPage from './features/auth/pages/SignUpPage';
import SignInPage from './features/auth/pages/SignInPage ';
import ProductAdminPage from '@/features/product/pages/ProductAdminPage';
import GalleriesAdminPage from '@/features/product/pages/GalleriesAdminPage';
import ProductPage from '@/features/product/pages/ProductPage';
import ProductDetailPage from '@/features/product/pages/ProductDetailPage';
import CartPage from '@/features/cart/pages/CartPage';
import ProfilePage from '@/features/user/pages/ProfilePage';
import OrderDetailPage from '@/features/order/pages/OrderDetailPage';
import OrderAdminPage from '@/features/order/pages/OrderAdminPage';
import OrderPage from '@/features/order/pages/OrderPage';
import OrderDetailAdminPage from '@/features/order/pages/OrderDetailAdminPage';
import CouponPage from '@/features/coupon/pages/ CouponPage';
import Loading from '@/components/Loading';
import { toast } from './redux/toast/toast.action';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserRoutes />,
        children: [
            {
                index: true,
                element: <ProductPage />
            },
            {
                path: 'products/:id',
                element: <ProductDetailPage />
            },
            {
                path: 'carts',
                element: <CartPage />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'orders',
                element: <OrderPage />
            },
            {
                path: 'orders/:id',
                element: <OrderDetailPage />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoutes />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'category',
                element: <CategoryAdminPage />
            },
            {
                path: 'product',
                element: <ProductAdminPage />
            },
            {
                path: 'product/:productId/images',
                element: <GalleriesAdminPage />
            },
            {
                path: 'order',
                element: <OrderAdminPage />
            },
            {
                path: 'order/:id',
                element: <OrderDetailAdminPage />
            },
            {
                path: 'coupon',
                element: <CouponPage />
            }
        ]
    },
    {
        path: '/sign-up',
        element: <SignUpPage />
    },
    {
        path: '/sign-in',
        element: <SignInPage />
    }
]);

// Create a client
const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            store.dispatch(toast.error(error.message));
        }
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            store.dispatch(toast.error(error.message));
        },
        onSuccess: (data: any) => {
            store.dispatch(toast.success(data.message));
        }
    })
});
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toast />
                <Loading />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
