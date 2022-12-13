import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ReportsPage from './pages/ReportsPage';

// ----------------------------------------------------------------------

export default function Router() {
  const auth = sessionStorage.getItem('role') !== undefined && sessionStorage.getItem('role') === 'admin';
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: auth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: auth ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />, index: true },
        { path: 'app', element: auth ? <DashboardAppPage /> : <Navigate to="/login" /> },
        { path: 'user', element: auth ? <UserPage /> : <Navigate to="/login" /> },
        { path: 'products', element: auth ? <ProductsPage /> : <Navigate to="/login" /> },
        { path: 'blog', element: auth ? <BlogPage /> : <Navigate to="/login" /> },
        {
          path: 'reports',
          element: auth ? <ReportsPage /> : <Navigate to="/login" />,
        },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: auth ? <SimpleLayout /> : <Navigate to="/login" />,
      children: [
        { element: auth ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
