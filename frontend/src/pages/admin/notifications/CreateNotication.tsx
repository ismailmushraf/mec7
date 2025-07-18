import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Send, Users, User, AlertCircle, Info, Calendar, RefreshCw, Zap } from 'lucide-react';
import type { CreateNotificationData, Member } from '../../../types/types';
import MemberSelector from '../../../components/admin/MemberSelector';

const CreateNotification: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateNotificationData>({
    title: '',
    description: '',
    type: 'general',
    targetAudience: 'all',
    targetMembers: []
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateNotificationData>>({});

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // TODO: Replace with actual API call
        const mockMembers: Member[] = [
          { id: '1', name: 'John Doe', email: 'john@example.com', role: 'member', joinedAt: '2023-01-15', isActive: true },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'leader', joinedAt: '2023-02-20', isActive: true },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member', joinedAt: '2023-03-10', isActive: true },
          { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'member', joinedAt: '2023-04-05', isActive: true },
          { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'leader', joinedAt: '2023-05-12', isActive: false },
        ];

        setTimeout(() => {
          setMembers(mockMembers);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateNotificationData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.targetAudience === 'specific' && (!formData.targetMembers || formData.targetMembers.length === 0)) {
      newErrors.targetMembers = 'Please select at least one member';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);
    try {
      // TODO: API call to send notification
      console.log('Sending notification:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to notifications list
      navigate('/admin/notifications');
    } catch (error) {
      console.error('Failed to send notification:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof CreateNotificationData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Reset target members when changing audience type
    if (name === 'targetAudience' && value === 'all') {
      setFormData(prev => ({ ...prev, targetMembers: [] }));
    }
  };

  const handleMemberSelection = (selectedMembers: string[]) => {
    setFormData(prev => ({ ...prev, targetMembers: selectedMembers }));
    if (errors.targetMembers) {
      setErrors(prev => ({ ...prev, targetMembers: undefined }));
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    const icons = {
      general: Info,
      event: Calendar,
      reminder: Bell,
      urgent: Zap,
      update: RefreshCw
    };
    return icons[type as keyof typeof icons] || Info;
  };

  const notificationTypes = [
    { value: 'general', label: 'General', icon: Info, color: 'text-blue-600 bg-blue-100' },
    { value: 'event', label: 'Event', icon: Calendar, color: 'text-purple-600 bg-purple-100' },
    { value: 'reminder', label: 'Reminder', icon: Bell, color: 'text-yellow-600 bg-yellow-100' },
    { value: 'urgent', label: 'Urgent', icon: Zap, color: 'text-red-600 bg-red-100' },
    { value: 'update', label: 'Update', icon: RefreshCw, color: 'text-green-600 bg-green-100' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.isActive);
  const selectedMembersCount = formData.targetMembers?.length || 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Send Notification</h1>
        <p className="text-gray-600 mt-1">Create and send notifications to your community members</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notification Type */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {notificationTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.type === type.value;
              
              return (
                <label
                  key={type.value}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-2 rounded-lg ${isSelected ? type.color : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Notification Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Notification Content</h2>
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter notification title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter notification message"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Target Audience</h2>
          
          {/* Audience Type Selection */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="targetAudience"
                value="all"
                checked={formData.targetAudience === 'all'}
                onChange={handleChange}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">All Members</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Send notification to all active members ({activeMembers.length} members)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="targetAudience"
                value="specific"
                checked={formData.targetAudience === 'specific'}
                onChange={handleChange}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Specific Members</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Choose specific members to receive this notification
                </p>
              </div>
            </label>
          </div>

          {/* Member Selection */}
          {formData.targetAudience === 'specific' && (
            <div>
              <MemberSelector
                members={activeMembers}
                selectedMembers={formData.targetMembers || []}
                onSelectionChange={handleMemberSelection}
              />
              {errors.targetMembers && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.targetMembers}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${notificationTypes.find(t => t.value === formData.type)?.color || 'bg-gray-100'}`}>
                {React.createElement(getNotificationTypeIcon(formData.type), { className: 'h-5 w-5' })}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {formData.title || 'Notification Title'}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.description || 'Notification description will appear here...'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  To: {formData.targetAudience === 'all' 
                    ? `All members (${activeMembers.length})` 
                    : `${selectedMembersCount} selected member${selectedMembersCount !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/notifications')}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSending}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            {isSending ? 'Sending...' : 'Send Notification'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotification;
