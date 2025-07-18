import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load admin components
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
//const CreateEvent = lazy(() => import('../pages/admin/events/CreateEvent'));
const EventsList = lazy(() => import('./pages/admin/events/EventsList'));
const EditEvent = lazy(() => import('./pages/admin/events/EditEvent'));
//const MediaUpload = lazy(() => import('../pages/admin/media/MediaUpload'));
//const MediaGallery = lazy(() => import('../pages/admin/media/MediaGallery'));
const SundayTreatInterests = lazy(() => import('./pages/admin/members/SundayTreatInterests'));
//const MembersManagement = lazy(() => import('../pages/admin/members/MembersManagement'));
const CreateNotification = lazy(() => import('./pages/admin/notifications/CreateNotication'));
//const NotificationsList = lazy(() => import('../pages/admin/notifications/NotificationsList'));
//const LeadersManagement = lazy(() => import('../pages/admin/leaders/LeadersManagement'));
//const LeaderSchedule = lazy(() => import('../pages/admin/leaders/LeaderSchedule'));
//const AttendanceTracking = lazy(() => import('../pages/admin/leaders/AttendanceTracking'));

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      // Event Management
      {
        path: 'events',
        children: [
          { index: true, element: <EventsList /> },
          //{ path: 'create', element: <CreateEvent /> },
          { path: 'edit/:id', element: <EditEvent /> }
        ]
      },
      //// Media Management
      //{
        //path: 'media',
        //children: [
          //{ index: true, element: <MediaGallery /> },
          //{ path: 'upload', element: <MediaUpload /> }
        //]
      //},
      //// Members Management
      {
        path: 'members',
        children: [
          //{ index: true, element: <MembersManagement /> },
          { path: 'sunday-treat-interests', element: <SundayTreatInterests /> }
        ]
      },
      //// Notifications
      {
        path: 'notifications',
        children: [
          //{ index: true, element: <NotificationsList /> },
          { path: 'create', element: <CreateNotification /> }
        ]
      },
      //// Leaders Management
      //{
        //path: 'leaders',
        //children: [
          //{ index: true, element: <LeadersManagement /> },
          //{ path: 'schedule', element: <LeaderSchedule /> },
          //{ path: 'attendance', element: <AttendanceTracking /> }
        //]
      //}
    ]
  }
];
