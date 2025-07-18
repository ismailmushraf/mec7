import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { routes } from './routes';
import { adminRoutes } from './adminRoutes';
import AuthGuard from './components/auth/AuthGuard';
import AdminGuard from './components/admin/AdminGuard';
import AdminLayout from './pages/admin/AdminLayout';

// Regular layout component
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Admin layout wrapper
const AdminWrapper: React.FC = () => {
  return (
    <AuthGuard>
      <AdminGuard>
          <AdminLayout /> 
      </AdminGuard>
    </AuthGuard>
  );
};

// Create router with both layouts
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routes
  },
  {
    path: '/admin',
    element: <AdminWrapper />,
    children: adminRoutes[0].children // Extract children from admin routes
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
