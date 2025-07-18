import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Phone, Calendar, Mail, MapPin, 
  Edit2, LogOut, Camera, Shield, Award
} from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  phone: string;
  email?: string;
  profilePhoto?: string;
  joinedDate: string;
  memberType: 'Regular' | 'Leader' | 'Faculty';
  location?: string;
  bio?: string;
  totalWorkouts?: number;
  currentStreak?: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock user data - replace with actual user data from context/API
  const userProfile: UserProfile = {
    id: 1,
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh.kumar@email.com",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    joinedDate: "2023-01-15",
    memberType: "Leader",
    location: "Chennai, Tamil Nadu",
    bio: "Fitness enthusiast | Marathon runner | Helping others achieve their fitness goals",
    totalWorkouts: 156,
    currentStreak: 12
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout API call
    setTimeout(() => {
      // Clear any stored auth tokens/data here
      // localStorage.removeItem('authToken');
      
      // Redirect to login page
      navigate('/login');
    }, 1000);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangePhoto = () => {
    // Handle photo upload logic here
    console.log('Change photo clicked');
  };

  const getMemberBadge = () => {
    switch (userProfile.memberType) {
      case 'Faculty':
        return { color: 'bg-yellow-500', text: 'Founding Member' };
      case 'Leader':
        return { color: 'bg-purple-500', text: 'Premium Member' };
      default:
        return { color: 'bg-gray-500', text: 'Regular Member' };
    }
  };

  const memberBadge = getMemberBadge();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center">My Profile</h1>
        </div>
      </section>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-b from-gray-50 to-white px-8 pt-8 pb-6">
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {userProfile.profilePhoto ? (
                    <img
                      src={userProfile.profilePhoto}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleChangePhoto}
                  className="absolute bottom-0 right-0 bg-[#15B1F1] text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  title="Change photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name and Badge */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h2>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm ${memberBadge.color}`}>
                <Award className="w-4 h-4" />
                {memberBadge.text}
              </span>
            </div>

            {/* Bio */}
            {userProfile.bio && (
              <p className="text-center text-gray-600 max-w-md mx-auto mb-6">
                {userProfile.bio}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#15B1F1]">{userProfile.totalWorkouts}</div>
                <div className="text-sm text-gray-600">Total Workouts</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{userProfile.currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 px-8 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              {/* Phone - Only visible when logged in */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#15B1F1]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#15B1F1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">+91 {userProfile.phone}</p>
                </div>
              </div>

              {/* Email */}
              {userProfile.email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#15B1F1]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#15B1F1]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{userProfile.email}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {userProfile.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#15B1F1]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#15B1F1]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{userProfile.location}</p>
                  </div>
                </div>
              )}

              {/* Member Since */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#15B1F1]/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#15B1F1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(userProfile.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEditProfile}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
              
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Privacy Protection</p>
            <p>Your phone number and personal information are only visible to you when logged in. Other members cannot see your contact details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
