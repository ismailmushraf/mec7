import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, MapPin, Save, X, AlertCircle, 
  ArrowLeft, Camera, Loader
} from 'lucide-react';

interface ProfileData {
  name: string;
  location: string;
  profilePhoto?: string;
}

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize with current user data - replace with actual user data
  const [formData, setFormData] = useState<ProfileData>({
    name: "Rajesh Kumar",
    location: "Chennai, Tamil Nadu",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
  });

  const [originalData] = useState<ProfileData>({ ...formData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Check if form has changes
  React.useEffect(() => {
    const changed = formData.name !== originalData.name || 
                   formData.location !== originalData.location;
    setHasChanges(changed);
  }, [formData, originalData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    } else if (formData.location.trim().length > 100) {
      newErrors.location = 'Location must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccessMessage(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) return;
    }
    navigate('/profile');
  };

  const handlePhotoChange = () => {
    // Handle photo upload logic here
    console.log('Change photo clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="bg-green-50 border-b border-green-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-1">
                  <Save className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-green-800 font-medium">
                  Profile updated successfully! Redirecting...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-50 border-b border-red-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800">{errors.general}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Photo Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePhotoChange}
                  className="absolute bottom-0 right-0 bg-[#15B1F1] text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  title="Change photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B1F1] focus:border-transparent transition-all`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B1F1] focus:border-transparent transition-all`}
                    placeholder="e.g., Chennai, Tamil Nadu"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.location}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  This helps other members know which area you're from
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your phone number cannot be changed here. Please contact support if you need to update your phone number.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="flex-1 px-6 py-3 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Options */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h3>
          <div className="space-y-3">
            <Link
              to="/profile/change-password"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Change Password</span>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </Link>
            
            <Link
              to="/profile/privacy"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Privacy Settings</span>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
