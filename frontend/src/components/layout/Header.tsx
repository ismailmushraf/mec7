import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import Logo from '../../assets/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleEvents = () => setIsEventsOpen(!isEventsOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <Logo className="h-10 transition-transform group-hover:scale-105" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/mec7-workout" className="text-gray-700 hover:text-[#15B1F1] transition-all duration-200 font-medium hover:scale-105 transform">
              Practice Mec7
            </a>
            <a href="/be-a-host" className="text-gray-700 hover:text-[#15B1F1] transition-all duration-200 font-medium hover:scale-105 transform">
              Be a Host
            </a>
            
            {/* Events Dropdown */}
            <div className="relative" ref={eventsRef}>
              <button
                onClick={toggleEvents}
                className="flex items-center text-gray-700 hover:text-[#15B1F1] transition-all duration-200 font-medium group"
              >
                Events
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isEventsOpen ? 'rotate-180' : ''} group-hover:text-[#15B1F1]`} />
              </button>
              <div className={`absolute left-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 transform origin-top ${
                isEventsOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <a href="/events/register" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#15B1F1]/10 hover:text-[#15B1F1] transition-colors duration-150">
                  Register
                </a>
                <a href="/events/gallery" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#15B1F1]/10 hover:text-[#15B1F1] transition-colors duration-150">
                  Gallery
                </a>
              </div>
            </div>
            
            <a href="/members" className="text-gray-700 hover:text-[#15B1F1] transition-all duration-200 font-medium hover:scale-105 transform">
              Members
            </a>
            <a href="/about" className="text-gray-700 hover:text-[#15B1F1] transition-all duration-200 font-medium hover:scale-105 transform">
              About
            </a>
          </nav>

          {/* Profile Dropdown */}
          <div className="hidden md:block relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center focus:outline-none group"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#15B1F1]/20 to-[#15B1F1]/10 flex items-center justify-center transition-all duration-200 group-hover:from-[#15B1F1]/30 group-hover:to-[#15B1F1]/20 group-hover:scale-110">
                <User className="h-5 w-5 text-[#15B1F1]" />
              </div>
            </button>
            <div className={`absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 transform origin-top-right ${
              isProfileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              <a href="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#15B1F1]/10 hover:text-[#15B1F1] transition-colors duration-150">
                Profile
              </a>
              <a href="/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#15B1F1]/10 hover:text-[#15B1F1] transition-colors duration-150">
                Login/Logout
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#15B1F1] focus:outline-none transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div className={`fixed inset-x-0 top-16 bg-white/95 backdrop-blur-md border-t shadow-lg transition-all duration-300 transform md:hidden ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`} style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="px-4 pt-4 pb-3 space-y-1 overflow-y-auto h-full">
          <a href="/mec7-workout" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200 font-medium">
            Practice Mec7
          </a>
          <a href="/be-a-host" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200 font-medium">
            Be a Host
          </a>
          
          {/* Mobile Events Submenu */}
          <div className="space-y-1">
            <button
              onClick={toggleEvents}
              className="w-full text-left px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl flex items-center justify-between transition-all duration-200 font-medium"
            >
              Events
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isEventsOpen ? 'rotate-180 text-[#15B1F1]' : ''}`} />
            </button>
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${isEventsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <a href="/events/register" className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-lg transition-all duration-200">
                Register
              </a>
              <a href="/events/gallery" className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-lg transition-all duration-200">
                Gallery
              </a>
            </div>
          </div>

          <a href="/members" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200 font-medium">
            Members
          </a>
          <a href="/about" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200 font-medium">
            About
          </a>

          {/* Mobile Profile Section - Separated */}
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-1">
            <div className="flex items-center px-4 py-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#15B1F1]/20 to-[#15B1F1]/10 flex items-center justify-center">
                <User className="h-5 w-5 text-[#15B1F1]" />
              </div>
              <span className="ml-3 font-medium text-gray-700">Account</span>
            </div>
            <a href="/profile" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200">
              Profile
            </a>
            <a href="/login" className="block px-4 py-3 text-gray-700 hover:text-[#15B1F1] hover:bg-[#15B1F1]/5 rounded-xl transition-all duration-200">
              Login/Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
