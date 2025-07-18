import React, { useState } from 'react';
import { Search, Users, UserCircle } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  profilePhoto?: string;
  joinedDate: string;
  memberType?: 'Regular' | 'Faculty' | 'Leader';
}

const MembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample members data - replace with actual API call
  const members: Member[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      joinedDate: "2023-01-15",
      memberType: "Faculty"
    },
    {
      id: 2,
      name: "Priya Sharma",
      profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      joinedDate: "2023-02-20",
      memberType: "Leader"
    },
    {
      id: 3,
      name: "Amit Patel",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      joinedDate: "2023-03-10",
      memberType: "Regular"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      joinedDate: "2023-03-15",
      memberType: "Leader"
    },
    {
      id: 5,
      name: "Vikram Singh",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      joinedDate: "2023-04-01",
      memberType: "Regular"
    },
    {
      id: 6,
      name: "Anita Desai",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      joinedDate: "2023-04-10",
      memberType: "Faculty"
    },
    {
      id: 7,
      name: "Rahul Verma",
      profilePhoto: undefined, // No photo
      joinedDate: "2023-05-01",
      memberType: "Regular"
    },
    {
      id: 8,
      name: "Kavitha Nair",
      profilePhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      joinedDate: "2023-05-15",
      memberType: "Leader"
    },
    {
      id: 9,
      name: "Suresh Babu",
      profilePhoto: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
      joinedDate: "2023-06-01",
      memberType: "Regular"
    },
    {
      id: 10,
      name: "Meera Krishnan",
      profilePhoto: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
      joinedDate: "2023-06-10",
      memberType: "Leader"
    },
    {
      id: 11,
      name: "Arjun Mehta",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      joinedDate: "2023-07-01",
      memberType: "Regular"
    },
    {
      id: 12,
      name: "Divya Iyer",
      profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      joinedDate: "2023-07-15",
      memberType: "Faculty"
    },
    {
      id: 13,
      name: "Karthik Raj",
      profilePhoto: undefined,
      joinedDate: "2023-08-01",
      memberType: "Regular"
    },
    {
      id: 14,
      name: "Pooja Gupta",
      profilePhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      joinedDate: "2023-08-10",
      memberType: "Leader"
    },
    {
      id: 15,
      name: "Sanjay Kumar",
      profilePhoto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
      joinedDate: "2023-09-01",
      memberType: "Regular"
    },
    {
      id: 16,
      name: "Neha Saxena",
      profilePhoto: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=400",
      joinedDate: "2023-09-15",
      memberType: "Leader"
    },
    {
      id: 17,
      name: "Arun Prasad",
      profilePhoto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400",
      joinedDate: "2023-10-01",
      memberType: "Regular"
    },
    {
      id: 18,
      name: "Lakshmi Menon",
      profilePhoto: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
      joinedDate: "2023-10-10",
      memberType: "Faculty"
    },
    {
      id: 19,
      name: "Rohit Sharma",
      profilePhoto: undefined,
      joinedDate: "2023-11-01",
      memberType: "Regular"
    },
    {
      id: 20,
      name: "Shruti Kapoor",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      joinedDate: "2023-11-15",
      memberType: "Leader"
    }
  ];

  // Filter members based on search
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get member badge
  const getMemberBadge = (memberType?: string) => {
    switch (memberType) {
      case 'Faculty':
        return (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Faculty
          </span>
        );
      case 'Leader':
        return (
          <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
            Leader
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Our Members</h1>
            <p className="text-xl opacity-90">
              Meet the amazing people who make our fitness community special
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              />
            </div>
            <div className="ml-4 text-gray-600">
              <span className="font-semibold">{filteredMembers.length}</span> members
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Member Badge */}
                  {getMemberBadge(member.memberType)}

                  {/* Profile Photo */}
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {member.profilePhoto ? (
                      <img
                        src={member.profilePhoto}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <UserCircle className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-center truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      Member since {new Date(member.joinedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No members found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MembersPage;
