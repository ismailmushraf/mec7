import React from 'react';
import { MessageCircle, Users } from 'lucide-react';

const LeadershipMessages: React.FC = () => {
  const leaders = [
    {
      name: "Capt. Salahudheen",
      position: "Founder",
      message: "A retired CRPF captain with over 25 years of service, Capt. Salahudheen founded Mec7 with a vision to bring military-style discipline and fitness to the community. His passion for health and wellness drives the organization's mission.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      name: "Arakkal Muhammad Bava",
      position: "Brand Ambassador",
      message: "A fitness enthusiast and motivational speaker, Bava has been instrumental in spreading the Mec7 movement across Chennai. His dynamic personality and dedication inspire hundreds of members daily.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-[#15B1F1]" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Message from Our Leaders
            </h2>
          </div>
          <div className="w-24 h-1 bg-[#15B1F1] mx-auto rounded-full"></div>
        </div>

        {/* Leaders Cards */}
        <div className="space-y-12">
          {leaders.map((leader, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Photo Side */}
              <div className="w-full lg:w-1/3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#15B1F1] rounded-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-300"></div>
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="relative w-full h-80 object-cover rounded-2xl shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/3 space-y-4">
                <div>
                  <p className="text-[#15B1F1] font-semibold uppercase tracking-wider text-sm">
                    {leader.position}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {leader.name}
                  </h3>
                </div>

                <div className="relative">
                  <MessageCircle className="absolute -left-2 -top-2 w-8 h-8 text-[#15B1F1]/20" />
                  <blockquote className="pl-8 pr-4 py-4 border-l-4 border-[#15B1F1] bg-gray-50 rounded-r-xl">
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      {leader.message}
                    </p>
                  </blockquote>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="px-6 py-2 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Connect
                  </button>
                  <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#15B1F1] hover:text-[#15B1F1] transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipMessages;
