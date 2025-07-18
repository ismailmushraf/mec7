import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, ArrowLeft, Search, Dumbbell, 
  MapPin, Calendar, Users 
} from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: "Events",
      description: "Browse upcoming fitness events",
      icon: Calendar,
      link: "/events/gallery"
    },
    {
      title: "Members",
      description: "Connect with our community",
      icon: Users,
      link: "/members"
    },
    {
      title: "Locations",
      description: "Find workout locations near you",
      icon: MapPin,
      link: "/locations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Large 404 Text */}
            <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none">
              404
            </h1>
            
            {/* Dumbbell Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#15B1F1] p-6 rounded-full shadow-lg animate-pulse">
                <Dumbbell className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this page took a rest day. The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Search Box */}
        <div className="mb-12">
          <p className="text-gray-600 mb-4">Try searching for what you need:</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search pages, events, or members..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // Handle search logic here
                  console.log('Search:', e.currentTarget.value);
                }
              }}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-gray-600 mb-6">Or check out these popular pages:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#15B1F1]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#15B1F1]/20 transition-colors">
                    <link.icon className="w-6 h-6 text-[#15B1F1]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 italic">
            "Even the best athletes sometimes lose their way. Let's get you back on track!" 
            <span className="text-2xl ml-2">💪</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
