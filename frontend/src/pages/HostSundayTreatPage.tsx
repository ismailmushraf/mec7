// pages/HostSundayTreatPage.tsx
import React, { useState } from 'react';
import HostRegistrationForm from '../components/sunday-treat/HostRegistration';
import { 
  Calendar, MapPin, Clock, CheckCircle, 
  AlertCircle, XCircle, Gift
} from 'lucide-react';

interface HostRequest {
  id: number;
  date: string;
  location: string;
  status: 'PROPOSED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  submittedOn: string;
  message?: string;
}

const HostSundayTreatPage: React.FC = () => {
  // Mock data for user's hosting history
  const [hostRequests, setHostRequests] = useState<HostRequest[]>([
    {
      id: 1,
      date: "2024-02-11",
      location: "Community Center Hall",
      status: "PROPOSED",
      submittedOn: "2024-01-28",
      message: "Your request is under review"
    },
    {
      id: 2,
      date: "2024-01-14",
      location: "Park Pavilion",
      status: "COMPLETED",
      submittedOn: "2023-12-20",
      message: "Thank you for hosting! 28 members attended"
    },
    {
      id: 3,
      date: "2023-12-24",
      location: "Beach Road",
      status: "REJECTED",
      submittedOn: "2023-12-01",
      message: "Date unavailable due to special event"
    },
    {
      id: 4,
      date: "2023-11-19",
      location: "Mec7 Center Garden",
      status: "COMPLETED",
      submittedOn: "2023-10-25",
      message: "Successfully hosted for 32 members"
    }
  ]);

  const handleFormSubmit = async (data: { date: string; location: string }) => {
    // Add new request with PROPOSED status
    const newRequest: HostRequest = {
      id: Date.now(),
      date: data.date,
      location: data.location,
      status: "PROPOSED",
      submittedOn: new Date().toISOString().split('T')[0],
      message: "Your request is under review"
    };

    setHostRequests([newRequest, ...hostRequests]);
  };

  const getStatusIcon = (status: HostRequest['status']) => {
    switch (status) {
      case 'PROPOSED':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: HostRequest['status']) => {
    switch (status) {
      case 'PROPOSED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#15B1F1] to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8" />
            <div>
              <h1 className="text-4xl font-bold">Host a Sunday Treat</h1>
              <p className="text-xl opacity-90 mt-2">
                Share the joy of healthy treats with our fitness community
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Registration Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Register to Host</h2>
              <HostRegistrationForm />
            </div>
          </div>

          {/* Right Column - Request Status */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Your Hosting History</h2>
              
              {hostRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't hosted any Sunday treats yet</p>
                  <p className="text-sm text-gray-400 mt-2">Submit your first request to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {hostRequests.map((request) => (
                    <div 
                      key={request.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {new Date(request.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {request.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Submitted: {new Date(request.submittedOn).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="text-sm font-medium">{request.status}</span>
                        </div>
                      </div>
                      
                      {request.message && (
                        <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{request.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSundayTreatPage;
