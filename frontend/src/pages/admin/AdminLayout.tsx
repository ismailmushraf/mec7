import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Upload,
  Users,
  Bell,
  Home,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Image,
  Coffee,
  UserCheck,
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  //const user = useRecoilValue(userState);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { 
      path: '/admin', 
      icon: Home, 
      label: 'Dashboard', 
      exact: true,
      mobileOnly: false 
    },
    { 
      path: '/admin/events', 
      icon: Calendar, 
      label: 'Events',
      badge: null,
      mobileOnly: false 
    },
    { 
      path: '/admin/media/upload', 
      icon: Upload, 
      label: 'Upload Media',
      mobileOnly: true // Hide in bottom nav 
    },
    { 
      path: '/admin/media', 
      icon: Image, 
      label: 'Gallery',
      mobileOnly: false 
    },
    { 
      path: '/admin/members', 
      icon: Users, 
      label: 'Members',
      mobileOnly: false 
    },
    { 
      path: '/admin/members/sunday-treat-interests', 
      icon: Coffee, 
      label: 'Sunday Treats',
      badge: '8', // Example badge
      mobileOnly: false 
    },
    { 
      path: '/admin/leaders', 
      icon: UserCheck, 
      label: 'Leaders',
      mobileOnly: true // Hide in bottom nav
    },
    { 
      path: '/admin/leaders/schedule', 
      icon: Calendar, 
      label: 'Schedule',
      mobileOnly: true // Hide in bottom nav
    },
    { 
      path: '/admin/notifications/create', 
      icon: Bell, 
      label: 'Notifications',
      mobileOnly: false 
    },
  ];

  // Filter items for bottom nav (mobile)
  const bottomNavItems = menuItems.filter(item => !item.mobileOnly);

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">
                Admin Panel
              </h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                  {/*                  {user?.name?.charAt(0).toUpperCase()} */}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {/* {user?.name} */}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className={`
        fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        ${isMobile ? '' : 'md:block'}
      `}>
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors
                    ${active 
                      ? 'bg-indigo-50 text-indigo-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`pt-16 ${!isMobile ? 'md:ml-64' : 'pb-16'}`}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="grid grid-cols-5 gap-1">
            {bottomNavItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex flex-col items-center gap-1 py-2 px-1 transition-colors relative
                    ${active 
                      ? 'text-indigo-600' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                  {active && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AdminLayout;
