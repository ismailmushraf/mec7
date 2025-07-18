import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Image, Video, X, Trash2 } from 'lucide-react';
import MediaUploadModal from '../../../components/admin/MediaUploadModal';
import MediaCard from '../../../components/admin/MediaCard';
import type { Event, CreateEventData } from '../../../types/types';
import type { Media } from '../../../types/types';

const EditEvent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    date: '',
    location: '',
    eventType: 'workout'
  });
  const [eventMedia, setEventMedia] = useState<Media[]>([]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateEventData>>({});

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // TODO: Replace with actual API call
        // Mock data
        const mockEvent: Event = {
          id: id!,
          title: 'Morning Workout Session',
          description: 'High-intensity interval training for all fitness levels',
          date: '2024-01-20T06:00:00',
          location: 'Community Park',
          eventType: 'workout',
          createdAt: '2024-01-15',
          createdBy: 'Admin',
          attendeesCount: 24,
          status: 'upcoming'
        };

        const mockMedia: Media[] = [
          {
            id: '1',
            name: 'Event Banner',
            url: 'https://via.placeholder.com/400x300',
            type: 'photo',
            eventId: id,
            uploadedAt: '2024-01-15',
            uploadedBy: 'Admin',
            thumbnailUrl: 'https://via.placeholder.com/150x150'
          }
        ];

        setEvent(mockEvent);
        setFormData({
          title: mockEvent.title,
          description: mockEvent.description,
          date: mockEvent.date.slice(0, 16), // Format for datetime-local input
          location: mockEvent.location,
          eventType: mockEvent.eventType
        });
        setEventMedia(mockMedia);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateEventData> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // TODO: API call to update event
      console.log('Updating event:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to events list
      navigate('/admin/events');
    } catch (error) {
      console.error('Failed to update event:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateEventData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMediaUpload = (uploadedMedia: Media[]) => {
    setEventMedia([...eventMedia, ...uploadedMedia]);
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      // TODO: API call to delete media
      setEventMedia(eventMedia.filter(m => m.id !== mediaId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/events')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600 mt-1">Update event details and manage media</p>
        </div>
      </div>

      {/* Event Details Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title *
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
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
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
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="workout">Workout</option>
              <option value="social">Social</option>
              <option value="competition">Competition</option>
              <option value="special">Special</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.location ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Media Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Event Media</h2>
          <button
            type="button"
            onClick={() => setIsMediaModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Upload className="h-5 w-5" />
            Add Media
          </button>
        </div>

        {eventMedia.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="flex justify-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Video className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">No media uploaded yet</p>
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Upload your first media
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {eventMedia.map((media) => (
              <MediaCard
                key={media.id}
                media={media}
                onDelete={handleDeleteMedia}
              />
            ))}
          </div>
        )}
      </div>

      {/* Media Upload Modal */}
      <MediaUploadModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onUpload={handleMediaUpload}
        eventId={id}
        eventName={formData.title}
      />
    </div>
  );
};

export default EditEvent;
