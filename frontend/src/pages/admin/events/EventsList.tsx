import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Search } from 'lucide-react';
import EventCard from '../../../components/admin/EventCard';
import CreateEventModal from '../../../components/admin/CreateEventModal';
import type { Event, CreateEventData } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | Event['eventType']>('all');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  // Mock data - replace with API call
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Morning Workout Session',
        description: 'High-intensity interval training for all fitness levels',
        date: '2024-01-20T06:00:00',
        location: 'Community Park',
        eventType: 'workout',
        createdAt: '2024-01-15',
        createdBy: 'Admin',
        attendeesCount: 24,
        status: 'upcoming'
      },
      {
        id: '2',
        title: 'Annual Fitness Competition',
        description: 'Test your limits in our annual fitness challenge',
        date: '2024-02-10T09:00:00',
        location: 'Sports Complex',
        eventType: 'competition',
        createdAt: '2024-01-10',
        createdBy: 'Admin',
        attendeesCount: 45,
        status: 'upcoming'
      },
      {
        id: '3',
        title: 'Community BBQ & Social',
        description: 'Join us for a fun evening of food and fellowship',
        date: '2024-01-25T17:00:00',
        location: 'Community Center',
        eventType: 'social',
        createdAt: '2024-01-12',
        createdBy: 'Admin',
        attendeesCount: 60,
        status: 'upcoming'
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateEvent = async (eventData: CreateEventData) => {
    // TODO: API call to create event
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      attendeesCount: 0,
      status: 'upcoming'
    };

    setEvents([newEvent, ...events]);
    setIsCreateModalOpen(false);
    
    // Show success message (you can use a toast library)
    console.log('Event created successfully');
  };

  const handleDeleteEvent = (eventId: string) => {
    // TODO: API call to delete event
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleEditEvent = (event: Event) => {
    // For now, you can navigate to edit page or open an edit modal
    // Option 1: Navigate to edit page
     navigate(`/admin/events/edit/${event.id}`);
    
    // Option 2: Open edit modal (you'll need to create an EditEventModal)
    // setSelectedEvent(event);
    // setIsEditModalOpen(true);
    
    console.log('Edit event:', event);
  };

  // Filter events based on search and type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.eventType === filterType;
    return matchesSearch && matchesType;
  });

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'workout', label: 'Workouts' },
    { value: 'social', label: 'Social' },
    { value: 'competition', label: 'Competitions' },
    { value: 'special', label: 'Special' },
    { value: 'meeting', label: 'Meetings' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Manage all your community events</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === type.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Get started by creating your first event'}
            </p>
            {!searchTerm && filterType === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create Event
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default EventsList;
