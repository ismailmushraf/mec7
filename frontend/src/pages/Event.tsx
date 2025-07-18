import React, { useState } from 'react';
import type { EventData } from '../components/common/EventCard';
import EventCard from '../components/common/EventCard';
import { Calendar, Filter, Search, ChevronDown } from 'lucide-react';
import GuestRegistrationModal from '../components/event/GuestRegistrationModal';

const ViewAllEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  // Sample events data - replace with actual data from backend
  const allEvents: EventData[] = [
    {
      id: 1,
      name: "Republic Day Special Workout Marathon",
      date: "26 January 2024",
      time: "6:00 AM - 8:00 AM",
      type: "Special Workout",
      location: "Peruvallur Ground",
      spotsLeft: 15,
      totalSpots: 50,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
    },
    {
      id: 2,
      name: "Mec7 Fitness Challenge 2024",
      date: "3 February 2024",
      time: "7:00 AM",
      type: "Competition",
      location: "Community Hall",
      spotsLeft: 8,
      totalSpots: 30,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600"
    },
    {
      id: 3,
      name: "Nutrition & Wellness Workshop",
      date: "10 February 2024",
      time: "5:00 PM - 7:00 PM",
      type: "Workshop",
      location: "Mec7 Center",
      spotsLeft: 22,
      totalSpots: 40,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600"
    },
    {
      id: 4,
      name: "Community Fitness Day",
      date: "14 February 2024",
      time: "6:30 AM",
      type: "Community",
      location: "Central Park",
      spotsLeft: 35,
      totalSpots: 100,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600"
    },
    {
      id: 5,
      name: "Women's Day Special Session",
      date: "8 March 2024",
      time: "7:00 AM",
      type: "Special Workout",
      location: "Mec7 Center",
      spotsLeft: 20,
      totalSpots: 40,
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600"
    },
    {
      id: 6,
      name: "Summer Fitness Bootcamp",
      date: "15 March 2024",
      time: "5:30 AM",
      type: "Competition",
      location: "Beach Road",
      spotsLeft: 45,
      totalSpots: 60,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600"
    }
  ];

  // Filter events based on search and type
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleRegister = (eventId: number) => {
    // Check if user is logged in (mock check - replace with actual auth check)
    const isLoggedIn = false; // Replace with actual auth check
    
    if (!isLoggedIn) {
      const event = allEvents.find(e => e.id === eventId);
      setSelectedEvent(event || null);
      setShowRegistrationModal(true);
    } else {
      // Handle logged in user registration
      console.log('Registering logged in user for event:', eventId);
    }
  };

  const eventTypes = ['all', 'Special Workout', 'Competition', 'Community', 'Workshop', 'Celebration'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">All Events</h1>
          <p className="text-xl opacity-90">Discover and join our upcoming fitness events</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="sticky top-16 z-10 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:border-[#15B1F1] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filter: {filterType === 'all' ? 'All Events' : filterType}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>

              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        filterType === type ? 'text-[#15B1F1] font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {type === 'all' ? 'All Events' : type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleRegister}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <GuestRegistrationModal
          event={selectedEvent}
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={async (data) => {
            console.log('Guest registration:', data);
            setShowRegistrationModal(false);
            // Handle registration submission
          }}
        />
      )}
    </div>
  );
};

export default ViewAllEventsPage;
