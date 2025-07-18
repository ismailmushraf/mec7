import type { RouteObject } from 'react-router-dom';
import Mec7Routine from './pages/Mec7Routine';
import Home from './pages/Home';
import AboutPage from './pages/About';
import ViewAllEventsPage from './pages/Event';
import EventsShowcasePage from './pages/EventsShowcasePage';
import EventDetailPage from './pages/ViewEventPage';
import HostSundayTreatPage from './pages/HostSundayTreatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MembersPage from './pages/Members';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfile';
import NotFoundPage from './pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/mec7-workout',
    element: <Mec7Routine />
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/be-a-host',
    element: <HostSundayTreatPage />,
  },
  {
    path: '/events/register',
    element: <ViewAllEventsPage />,
  },
  {
    path: '/events/gallery',
    element: <EventsShowcasePage />
  },
  {
    path: '/events/showcase/:id',
    element: <EventDetailPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/profile/edit',
    element: <EditProfilePage />
  },
  {
    path: '/members',
    element: <MembersPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
];
