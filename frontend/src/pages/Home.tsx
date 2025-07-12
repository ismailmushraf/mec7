
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/layout/Header';
import { routes } from '../routes';

// Create a layout component
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

// Wrap routes with layout
const routesWithLayout = routes.map(route => ({
  ...route,
  element: <Layout>{route.element}</Layout>
}));

const router = createBrowserRouter(routesWithLayout);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
