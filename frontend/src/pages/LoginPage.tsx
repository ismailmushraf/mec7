import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Lock, Eye, EyeOff, LogIn, Dumbbell, Heart, Users 
} from 'lucide-react';
import { apiService } from '../services/api';
import { userState } from '../recoil/atoms/authAtom';
import { useSetRecoilState } from 'recoil';

const LoginPage: React.FC = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '', // phone or username
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await apiService.login(formData);
      
      const data = response.data!;
      // Save token and user data
      apiService.setToken(data.token);
      setUser(data.user);
      
      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#15B1F1] p-3 rounded-full">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue your fitness journey
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Username/Phone Input */}
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B1F1] focus:border-transparent transition-all"
                    placeholder="Enter phone or username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B1F1] focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#15B1F1] focus:ring-[#15B1F1] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#15B1F1] hover:text-blue-600">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-white bg-[#15B1F1] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#15B1F1] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-[#15B1F1] hover:text-blue-600">
                  Sign up now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Graphics */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#15B1F1] to-blue-600">
          <div className="absolute inset-0 bg-black/20" />
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200" 
            alt="Fitness"
            className="h-full w-full object-cover mix-blend-overlay"
          />
        </div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-6">Transform Your Life with Mec7 Fitness</h1>
            <p className="text-xl mb-8 opacity-90">
              Join our community of fitness enthusiasts and achieve your health goals together
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-lg">500+ Active Members</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-lg">Personalized Training Programs</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <span className="text-lg">State-of-the-art Equipment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
