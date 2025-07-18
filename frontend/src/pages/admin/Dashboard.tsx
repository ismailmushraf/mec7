import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  Upload,
  Users,
  Bell,
  UserCheck,
  TrendingUp,
  Clock,
  Award,
  Coffee,
  UserPlus,
  MoveUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data - replace with real data from your API
  const stats = {
    totalMembers: 156,
    activeLeaders: 12,
    upcomingEvents: 3,
    sundayTreatRequests: 8
  };

  const recentActivities = [
    { id: 1, type: 'member', message: 'New member joined: Sarah Johnson', time: '2 hours ago' },
    { id: 2, type: 'event', message: 'Workout session completed', time: '5 hours ago' },
    { id: 3, type: 'leader', message: 'John assigned as leader for tomorrow', time: '1 day ago' },
  ];

  const upcomingSchedule = [
    { id: 1, day: 'Monday', leader: 'John Doe', status: 'confirmed' },
    { id: 2, day: 'Tuesday', leader: 'Jane Smith', status: 'pending' },
    { id: 3, day: 'Wednesday', leader: 'Mike Johnson', status: 'confirmed' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your fitness community today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalMembers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Leaders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeLeaders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <Link to="/admin/leaders" className="mt-4 text-sm text-indigo-600 hover:text-indigo-700">
            Manage leaders →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.upcomingEvents}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <Link to="/admin/events" className="mt-4 text-sm text-indigo-600 hover:text-indigo-700">
            See events →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sunday Treat Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.sundayTreatRequests}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Coffee className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <Link to="/admin/members/sunday-treat-interests" className="mt-4 text-sm text-indigo-600 hover:text-indigo-700">
            View requests →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/events"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <Calendar className="h-8 w-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">See Events</span>
          </Link>
          
          <Link
            to="/admin/media/upload"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <Upload className="h-8 w-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Upload Media</span>
          </Link>
          
          <Link
            to="/admin/notifications/create"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <Bell className="h-8 w-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Send Notification</span>
          </Link>
          
          <Link
            to="/admin/members"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <MoveUp className="h-8 w-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Promote Member</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg
                  ${activity.type === 'member' && 'bg-blue-100'}
                  ${activity.type === 'event' && 'bg-purple-100'}
                  ${activity.type === 'leader' && 'bg-green-100'}
                `}>
                  {activity.type === 'member' && <Users className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'event' && <Calendar className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'leader' && <Award className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Week's Schedule */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">This Week's Leaders</h2>
            <Link to="/admin/leaders/schedule" className="text-sm text-indigo-600 hover:text-indigo-700">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingSchedule.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{schedule.day}</p>
                  <p className="text-sm text-gray-600">{schedule.leader}</p>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${schedule.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                  }
                `}>
                  {schedule.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
