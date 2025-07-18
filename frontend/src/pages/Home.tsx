import React from 'react';
import ImageSlider from '../components/home/ImageSlider';
import AboutMec7Section from '../components/home/AboutMec7Section';
import UpcomingEvents from '../components/home/UpcomingEvents';
import LeadershipMessages from '../components/home/LeadershipMessages';

const Home: React.FC = () => {
  const sliderImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      eventName: 'Morning Yoga Session',
      date: 'January 15, 2024'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200',
      eventName: 'Beach Workout Challenge',
      date: 'January 10, 2024'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200',
      eventName: 'Community Fitness Day',
      date: 'January 5, 2024'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200',
      eventName: 'New Year Bootcamp',
      date: 'January 1, 2024'
    }
  ];

  return (
    <div>
      <ImageSlider images={sliderImages} autoPlayInterval={5000} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Your other content */}
        <AboutMec7Section />
        <UpcomingEvents />
        <LeadershipMessages />
      </div>
    </div>
  );
};

export default Home;
