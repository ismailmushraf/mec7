import React from 'react';
import { Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ShowcaseEvent } from '../../types/types';

interface EventShowcaseCardProps {
  event: ShowcaseEvent;
}

const EventShowcaseCard: React.FC<EventShowcaseCardProps> = ({ event }) => {
  return (
    <Link 
      to={`/events/showcase/${event.id}`}
      className="block group hover:transform hover:scale-[1.02] transition-all duration-300 h-full"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow w-full h-[500px] flex flex-col">
        {/* Cover Image - Fixed height of 220px */}
        <div className="relative h-[220px] overflow-hidden flex-shrink-0">
          <img 
            src={event.coverImage} 
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Participant Count Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Users className="w-4 h-4 text-[#15B1F1]" />
            <span className="text-sm font-semibold">{event.participantsCount}</span>
          </div>
        </div>

        {/* Content - Remaining space */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#15B1F1] transition-colors line-clamp-1 truncate">
              {event.name}
            </h3>
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
              {event.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div>
            {/* Image Preview Strip */}
            <div className="flex gap-2 mb-4">
              {event.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Event ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 3 && event.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-semibold">
                      +{event.images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View More Link */}
            <div className="flex items-center text-[#15B1F1] font-semibold group-hover:gap-3 gap-2 transition-all">
              <span>View Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventShowcaseCard;
