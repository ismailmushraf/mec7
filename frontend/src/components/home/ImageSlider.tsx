// ImageSlider.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface SlideImage {
  id: number;
  url: string;
  eventName: string;
  date: string;
}

interface ImageSliderProps {
  images: SlideImage[];
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && autoPlayInterval) {
      const interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, autoPlayInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Get visible images (current, previous, next)
  const getVisibleImages = () => {
    const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleImages();

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Height responsive container */}
      <div className="relative h-[30vh] mt-8 md:h-[60vh] max-h-[600px]">
        {/* Main slider container - flex layout */}
        <div className="relative h-full flex items-center">
          
          {/* Previous image preview - Hidden on mobile */}
          <div className="hidden lg:block w-[10%] h-[85%] overflow-hidden mr-2">
            <div className="relative h-full rounded-l-xl overflow-hidden">
              <img
                src={images[prev].url}
                alt={images[prev].eventName}
                className="h-full w-full object-cover opacity-40 cursor-pointer hover:opacity-60 transition-all duration-300 scale-110"
                onClick={handlePrevious}
                style={{ 
                  objectPosition: 'right center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Main image */}
          <div 
            className="relative flex-1 h-full px-4 lg:px-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={images[current].url}
                alt={images[current].eventName}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
              />
              
              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 p-6 lg:p-8 text-white">
                  <h3 className="text-xl lg:text-3xl font-bold mb-2">
                    {images[current].eventName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm lg:text-base opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span>{images[current].date}</span>
                  </div>
                </div>
              </div>

              {/* Mobile: Persistent subtle overlay */}
              <div className="lg:hidden absolute top-0 left-0 bg-black/30 text-white px-3 py-1.5 rounded-br-lg">
                <p className="text-xs font-medium">{images[current].eventName}</p>
              </div>
            </div>
          </div>

          {/* Next image preview - Hidden on mobile */}
          <div className="hidden lg:block w-[10%] h-[85%] overflow-hidden ml-2">
            <div className="relative h-full rounded-r-xl overflow-hidden">
              <img
                src={images[next].url}
                alt={images[next].eventName}
                className="h-full w-full object-cover opacity-40 cursor-pointer hover:opacity-60 transition-all duration-300 scale-110"
                onClick={handleNext}
                style={{ 
                  objectPosition: 'left center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 lg:left-[12%] top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 lg:right-[12%] top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              } rounded-full shadow-lg`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
