import React from 'react';
import { Users, Zap, Heart, Trophy, Sun, Clock } from 'lucide-react';

const AboutMec7Section: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: "21 Minutes Daily",
      description: "Quick, effective workouts that fit any schedule"
    },
    {
      icon: Users,
      title: "Make Real Friends",
      description: "Join a supportive community of fitness enthusiasts"
    },
    {
      icon: Zap,
      title: "Boost Energy",
      description: "Start your day with renewed vitality and focus"
    },
    {
      icon: Heart,
      title: "Improve Health",
      description: "Build strength, flexibility, and cardiovascular fitness"
    },
    {
      icon: Sun,
      title: "Morning Sessions",
      description: "Energizing workouts to kickstart your day"
    },
    {
      icon: Trophy,
      title: "Be part of a Community",
      description: "Become part of a community"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - About Mec7 */}
          <div className="space-y-6 lg:pr-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Transform Your Life in Just <span className="text-[#15B1F1]">21 Minutes</span>
              </h2>
              <div className="w-20 h-1 bg-[#15B1F1] rounded-full mb-6"></div>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                <strong className="text-gray-800">Mec7</strong> is more than just a workout – it's a lifestyle revolution. 
                Our scientifically-designed 7-minute routine combines <strong className="text-gray-800">21 powerful exercises</strong> that 
                work every muscle in your body.
              </p>
              
              <p className="text-lg leading-relaxed">
                Founded in Peruvallur, Chennai, we've built a thriving community where fitness meets friendship. 
                Whether you're a beginner or a fitness enthusiast, our program adapts to your level while 
                pushing you to achieve your best.
              </p>
              
              <p className="text-lg leading-relaxed">
                Join hundreds of members who've discovered that <strong className="text-gray-800">consistency beats intensity</strong>. 
                Just 7 minutes a day can transform your health, energy, and confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-[#15B1F1] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <span className="relative z-10"><a href='/mec7-workout'>Try Mec7</a></span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#15B1F1] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:border-[#15B1F1] hover:text-[#15B1F1]">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#15B1F1]/10 rounded-xl flex items-center justify-center group-hover:bg-[#15B1F1]/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#15B1F1]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMec7Section;
