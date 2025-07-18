import React, { useState } from 'react';
import { Play, Info, ChevronDown } from 'lucide-react';

interface WorkoutCardProps {
  title: string;
  description: string;
  benefits: string[];
  videoUrl?: string;
  videoType?: 'youtube' | 'html';
  thumbnailUrl?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  description,
  benefits,
  videoUrl,
  videoType = 'youtube',
  thumbnailUrl
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="relative">
      {/* Wrapper for transform effects */}
      <div 
        className={`relative transition-all duration-500 ${
          isExpanded ? 'z-20 scale-105' : 'z-0 scale-100'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main card container */}
        <div className="relative group">
          {/* Background card for expanded state */}
          <div className={`absolute inset-0 bg-white rounded-2xl shadow-2xl transition-all duration-500 ${
            isExpanded ? 'shadow-2xl scale-100' : 'shadow-lg scale-100'
          }`} />
          
          {/* Main card content */}
          <div className="relative bg-white rounded-2xl overflow-hidden">
            {/* Video Section */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
              {!isVideoPlaying ? (
                <>
                  {thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#15B1F1]/10 to-[#15B1F1]/5">
                      <div className="text-6xl font-bold text-[#15B1F1]/20">
                        {title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {videoUrl && (
                    <button
                      onClick={handlePlayVideo}
                      className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
                        isExpanded ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-transform hover:scale-110">
                        <Play className="w-8 h-8 text-[#15B1F1] fill-current ml-1" />
                      </div>
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full h-full">
                  {videoType === 'youtube' ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    />
                  )}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {title}
              </h3>
              
              {/* Description - Collapsed */}
              <div className="relative">
                <p className={`text-sm text-gray-600 transition-all duration-500 ${
                  isExpanded ? 'opacity-0 invisible' : 'opacity-100 visible line-clamp-2'
                }`}>
                  {description}
                </p>
                
                {/* Expand indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none transition-opacity duration-300 ${
                  isExpanded ? 'opacity-0' : 'opacity-100'
                }`}>
                  <ChevronDown className="w-4 h-4 text-[#15B1F1] animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Expanded content overlay */}
          <div className={`absolute left-0 right-0 bg-white rounded-b-2xl px-6 pb-6 transition-all duration-500 transform ${
            isExpanded 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
          style={{
            top: 'calc(100% - 5.5rem)', // Overlap with the collapsed description area
          }}>
            {/* Full Description */}
            <p className="text-sm text-gray-600 mb-4">
              {description}
            </p>
            
            {/* Benefits */}
            <div>
              <div className="flex items-center gap-1 text-xs font-medium text-[#15B1F1] mb-2">
                <Info className="w-3 h-3" />
                <span>Benefits:</span>
              </div>
              <ul className="text-xs text-gray-500 space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#15B1F1] mr-1 text-lg leading-3">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
