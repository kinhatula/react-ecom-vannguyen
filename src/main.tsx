import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//react router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import UserRoutes from '@/routes/user.routes.tsx';
import ProductList from '@/features/product/components/ProductList.tsx';
import SignUpPage from '@/features/auth/pages/SignUpPage.tsx';
import SignInPage from './features/auth/pages/SignInPage ';
import Toast from './components/Toast';

//redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

//tanstack query
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserRoutes />,
        children: [
            {
                path: 'products',
                element: <ProductList />
            },
            {
                path: 'profile',
                element: <div>Profiles</div>
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
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toast />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
