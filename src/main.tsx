import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//react router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import UserRoutes from '@/routes/user.routes.tsx';
import ProductList from '@/features/product/components/ProductList.tsx';
import SignUpPage from '@/features/auth/pages/SignUpPage.tsx';
import SignInPage from './features/auth/pages/SignInPage ';

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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
