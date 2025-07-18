import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import EventCard from '../common/EventCard';
import type { EventData } from '../common/EventCard';

const UpcomingEvents: React.FC = () => {
  // Sample events data - replace with actual data from your backend
  const upcomingEvents: EventData[] = [
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
    }
  ];

  const handleRegister = (eventId: number) => {
    // Handle registration logic
    console.log('Register for event:', eventId);
    // You can navigate to registration page or open a modal
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#15B1F1]" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <Sparkles className="w-6 h-6 text-[#15B1F1]" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our exciting events and take your fitness journey to the next level. 
            Register early to secure your spot!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRegister={handleRegister}
            />
          ))}
        </div>

        {/* View All Events Link */}
        <div className="text-center">
          <a 
            href="/events" 
            className="inline-flex items-center gap-2 text-[#15B1F1] hover:text-blue-600 font-semibold text-lg group transition-colors duration-300"
          >
            View All Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
