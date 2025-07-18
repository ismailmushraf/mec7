import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export interface EventData {
  id: number;
  name: string;
  date: string;
  time: string;
  type: 'Special Workout' | 'Competition' | 'Community' | 'Workshop' | 'Celebration';
  location?: string;
  spotsLeft?: number;
  totalSpots?: number;
  image?: string;
}

interface EventCardProps {
  event: EventData;
  onRegister?: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const getTypeColor = (type: EventData['type']) => {
    switch (type) {
      case 'Special Workout':
        return 'bg-blue-100 text-blue-700';
      case 'Competition':
        return 'bg-red-100 text-red-700';
      case 'Community':
        return 'bg-green-100 text-green-700';
      case 'Workshop':
        return 'bg-purple-100 text-purple-700';
      case 'Celebration':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const spotsPercentage = event.spotsLeft && event.totalSpots 
    ? ((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100 
    : 0;

  return (
<div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
{/* Event Image or Gradient */}
      <div className="relative h-48 overflow-hidden">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#15B1F1]/20 to-[#15B1F1]/5 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-[#15B1F1]/30" />
          </div>
        )}
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}>
            {event.type}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        {/* Title at top */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#15B1F1] transition-colors">
            {event.name}
          </h3>
        </div>

        {/* Details at bottom */}
        <div className="space-y-4 mt-auto">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#15B1F1]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#15B1F1]" />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#15B1F1]" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.spotsLeft !== undefined && event.totalSpots && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" />
                  {event.spotsLeft} spots left
                </span>
                <span className="text-gray-500 text-xs">
                  {event.totalSpots - event.spotsLeft}/{event.totalSpots} registered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#15B1F1] to-blue-600 transition-all duration-500"
                  style={{ width: `${spotsPercentage}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => onRegister?.(event.id)}
            className="w-full py-3 bg-[#15B1F1] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-300 hover:shadow-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
