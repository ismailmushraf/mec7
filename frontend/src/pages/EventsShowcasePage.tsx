import React, { useState } from 'react';
import EventShowcaseCard from '../components/event/EventShowcaseCard';
import { Search, Filter, ChevronDown, Image } from 'lucide-react';
import type { ShowcaseEvent } from '../types/types';

const EventsShowcasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);

  // Sample showcase events data
  const showcaseEvents: ShowcaseEvent[] = [
    {
      id: 1,
      name: "Republic Day Fitness Marathon 2024",
      date: "26 January 2024",
      description: "A grand celebration combining fitness and patriotism with over 500 participants joining for a special Republic Day workout marathon.",
      detailedContent: `
        The Republic Day Fitness Marathon 2024 was a spectacular event that brought together fitness enthusiasts from across the city. 
        Starting at dawn with the national anthem, participants engaged in a series of workout sessions themed around unity and strength.
        
        The event featured special tricolor-themed exercises, patriotic music, and concluded with a community breakfast where participants 
        shared their fitness journeys and celebrated the spirit of the nation.
      `,
      participantsCount: 523,
      location: "Peruvallur Ground",
      duration: "3 hours",
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
      ],
      highlights: [
        "500+ participants from all age groups",
        "Tricolor-themed workout sessions",
        "Guest appearance by national athletes",
        "Community breakfast celebration",
        "Prize distribution for best performers"
      ],
      organizers: ["Mec7 Fitness Team", "Local Sports Authority"],
      comments: []
    },
    {
      id: 2,
      name: "Women's Day Special Bootcamp",
      date: "8 March 2024",
      description: "Empowering women through fitness - a special bootcamp celebrating Women's Day with inspiring sessions and community bonding.",
      detailedContent: `
        The Women's Day Special Bootcamp was more than just a fitness event - it was a celebration of strength, resilience, and sisterhood.
        
        The event featured specially curated workout sessions designed by female trainers, focusing on empowerment through physical fitness.
        Participants enjoyed motivational talks by successful women from various fields, sharing their journeys of breaking barriers.
      `,
      participantsCount: 287,
      location: "Mec7 Center",
      duration: "4 hours",
      coverImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800",
      images: [
        "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800"
      ],
      highlights: [
        "Female-led training sessions",
        "Inspirational talks by women achievers",
        "Self-defense workshop",
        "Healthy nutrition seminar",
        "Community support network formation"
      ],
      organizers: ["Mec7 Women's Wing", "Local Women's Association"],
      comments: []
    },
    {
      id: 3,
      name: "Summer Fitness Challenge 2023",
      date: "15 May 2023",
      description: "Beat the heat with our intense summer fitness challenge that tested endurance and brought the community together.",
      detailedContent: `
        The Summer Fitness Challenge 2023 was designed to help participants maintain their fitness routine despite the scorching heat.
        
        Early morning sessions starting at 5 AM ensured comfortable workout conditions. The challenge included various stations 
        testing different aspects of fitness - strength, endurance, flexibility, and agility.
      `,
      participantsCount: 412,
      location: "Beach Road",
      duration: "2.5 hours",
      coverImage: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
      images: [
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800"
      ],
      highlights: [
        "Early morning sessions to beat the heat",
        "Hydration stations throughout",
        "Beach workout sessions",
        "Cool-down yoga by the sea",
        "Healthy summer snacks distribution"
      ],
      organizers: ["Mec7 Fitness", "Beach Sports Club"],
      comments: []
    },
    {
      id: 4,
      name: "Independence Day Freedom Run",
      date: "15 August 2023",
      description: "Celebrating freedom through fitness with a memorable 5K run that united the community in patriotic spirit.",
      detailedContent: `
        The Independence Day Freedom Run was a tribute to our nation's journey to freedom, expressed through the freedom of movement and fitness.
        
        Starting with flag hoisting at 6 AM, participants ran a scenic 5K route decorated with tricolor flags and motivational messages.
      `,
      participantsCount: 678,
      location: "City Marathon Route",
      duration: "3 hours",
      coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
      images: [
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800"
      ],
      highlights: [
        "5K freedom run with 600+ participants",
        "Flag hoisting ceremony",
        "Patriotic flash mob",
        "Free health checkup camp",
        "Cultural performances"
      ],
      organizers: ["Mec7 Fitness", "City Running Club"],
      comments: []
    },
    {
      id: 5,
      name: "Diwali Fitness Fest 2023",
      date: "10 November 2023",
      description: "Light up your fitness journey with our special Diwali celebration combining traditional festivities with modern workouts.",
      detailedContent: `
        The Diwali Fitness Fest brought a unique blend of traditional celebrations and fitness activities, proving that festivals and fitness go hand in hand.
        
        The event featured fusion workouts incorporating traditional dance moves, lamp-lighting ceremony, and healthy festive snacks demonstration.
      `,
      participantsCount: 345,
      location: "Community Center",
      duration: "4 hours",
      coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
      images: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
      ],
      highlights: [
        "Fusion dance-workout sessions",
        "Healthy Diwali snacks workshop",
        "Traditional games with fitness twist",
        "Lamp lighting ceremony",
        "Community potluck dinner"
      ],
      organizers: ["Mec7 Fitness", "Cultural Committee"],
      comments: []
    },
    {
      id: 6,
      name: "New Year Transformation Kickoff 2024",
      date: "1 January 2024",
      description: "Started the new year with high energy and determination as hundreds joined to kickstart their fitness resolutions.",
      detailedContent: `
        The New Year Transformation Kickoff was designed to help participants turn their resolutions into reality with a powerful start to 2024.
        
        The event included goal-setting workshops, fitness assessments, and group workouts that set the tone for a year of transformation.
      `,
      participantsCount: 456,
      location: "Mec7 Main Center",
      duration: "5 hours",
      coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800"
      ],
      highlights: [
        "Goal-setting workshop",
        "Free fitness assessments",
        "Transformation challenge launch",
        "Nutrition planning session",
        "Motivational speaker session"
      ],
      organizers: ["Mec7 Fitness Team"],
      comments: []
    }
  ];

  // Filter events
  const filteredEvents = showcaseEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || event.date.includes(filterYear);
    return matchesSearch && matchesYear;
  });

  const years = ['all', '2024', '2023', '2022'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Events Showcase</h1>
          <p className="text-xl opacity-90">Relive our amazing fitness events and community celebrations</p>
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
                placeholder="Search past events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:border-[#15B1F1] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Year: {filterYear === 'all' ? 'All Years' : filterYear}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>

              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setFilterYear(year);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        filterYear === year ? 'text-[#15B1F1] font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {year === 'all' ? 'All Years' : year}
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
                <EventShowcaseCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Summary */}
      <section className="bg-gray-100 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Impact in Numbers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#15B1F1] mb-2">
                {showcaseEvents.length}
              </div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#15B1F1] mb-2">
                {showcaseEvents.reduce((sum, event) => sum + event.participantsCount, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Total Participants</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#15B1F1] mb-2">
                {showcaseEvents.reduce((sum, event) => sum + event.images.length, 0)}
              </div>
              <div className="text-gray-600">Event Photos</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsShowcasePage;
