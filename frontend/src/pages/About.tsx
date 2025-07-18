import React from 'react';
import { Shield, Award, Users, Heart, Star } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  icon?: React.ElementType;
}

interface Leader {
  name: string;
  image: string;
}

const AboutPage: React.FC = () => {
  const mainTeam: TeamMember[] = [
    {
      name: "Basheer Anchalan",
      position: "Chairman",
      bio: "With extensive experience in community leadership and organizational management, Basheer ensures smooth operations and strategic growth of Mec7. His vision has helped expand the program to multiple locations.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      icon: Award
    },
    {
      name: "Rasheed Palappetti",
      position: "Coordinator",
      bio: "The backbone of daily operations, Rasheed coordinates between members, leaders, and management. His excellent organizational skills ensure every workout session runs smoothly and efficiently.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      icon: Users
    },
    {
      name: "Abdu Rahman",
      position: "Volunteer Leader",
      bio: "Leading by example, Abdu Rahman manages our volunteer network and ensures new members feel welcomed. His dedication to service has created a strong support system within the Mec7 community.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
      icon: Heart
    }
  ];

  const leaders: Leader[] = [
    { name: "Ismail Musharaf", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400" },
    { name: "Abdu Rahman PK", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { name: "Mohammed Shahid", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { name: "Abdul Kareem", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400" },
    { name: "Shameer Ahmed", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" },
    { name: "Riyaz Khan", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400" },
    { name: "Salim Kumar", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400" },
    { name: "Anwar Ali", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" },
    { name: "Jabir Rahman", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400" },
    { name: "Naseer Mohammed", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400" },
    { name: "Faisal Abbas", image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400" },
    { name: "Zakir Hussain", image: "https://images.unsplash.com/photo-1482961674540-0b0e8363a005?w=400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            The passionate individuals behind Mec7's success, dedicated to transforming lives through fitness and community
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Main Leadership Team */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Team</h2>
          
          <div className="space-y-16">
            {mainTeam.map((member, index) => {
              const Icon = member.icon;
              return (
                <div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Photo */}
                  <div className="w-full lg:w-1/3">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#15B1F1] to-blue-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
                      />
                      {Icon && (
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#15B1F1]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-2/3 text-center lg:text-left">
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-[#15B1F1] font-semibold text-lg uppercase tracking-wider">
                        {member.position}
                      </p>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <button className="px-6 py-2 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Connect
                      </button>
                      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#15B1F1] hover:text-[#15B1F1] transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leaders</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Meet the dedicated leaders who guide our daily workout sessions and keep the Mec7 spirit alive
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {leaders.map((leader, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="relative mb-3 overflow-hidden rounded-xl">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#15B1F1] transition-colors">
                  {leader.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of the Mec7 family and help us transform more lives through fitness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-[#15B1F1] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Become a Leader
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
