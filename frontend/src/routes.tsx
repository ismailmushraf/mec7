import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/mec7-workout',
    element: <div>Routine page</div>
  },
  {
    path: '/about',
    element: <div>About Page</div>,
  },
  {
    path: '/members',
    element: <div>Members Page</div>,
  },
  {
    path: '/be-a-host',
    element: <div>Be a Host Page</div>,
  },
  {
    path: '/events/register',
    element: <div>Event Register Page</div>,
  },
  {
    path: '/events/gallery',
    element: <div>Event Gallery Page</div>,
  },
  {
    path: '/profile',
    element: <div>Profile Page</div>,
  },
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];
