import React, { useState, useEffect } from 'react';
import { Coffee, Calendar, Users, Clock, Filter, Search } from 'lucide-react';
import type { SundayTreatRequest, StatusUpdateData } from '../../../types/types';
import SundayTreatCard from '../../../components/admin/SundayTreatCard';
import StatusUpdateModal from '../../../components/admin/StatusUpdateModal';

const SundayTreatInterests: React.FC = () => {
  const [requests, setRequests] = useState<SundayTreatRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<SundayTreatRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | SundayTreatRequest['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<SundayTreatRequest | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const mockRequests: SundayTreatRequest[] = [
      {
        id: '1',
        memberId: 'm1',
        memberName: 'John Doe',
        memberEmail: 'john@example.com',
        memberPhone: '+1234567890',
        houseName: 'Doe Residence',
        preferredDate: '2024-02-04',
        alternativeDate: '2024-02-11',
        numberOfGuests: 8,
        specialRequests: 'Vegetarian options needed for 2 guests',
        status: 'proposed',
        requestedAt: '2024-01-20T10:30:00',
        updatedAt: '2024-01-20T10:30:00'
      },
      {
        id: '2',
        memberId: 'm2',
        memberName: 'Jane Smith',
        memberEmail: 'jane@example.com',
        houseName: 'Smith Family',
        preferredDate: '2024-02-11',
        numberOfGuests: 12,
        status: 'approved',
        requestedAt: '2024-01-19T14:20:00',
        updatedAt: '2024-01-21T09:15:00',
        updatedBy: 'Admin',
        notes: 'Confirmed for the preferred date'
      },
      {
        id: '3',
        memberId: 'm3',
        memberName: 'Mike Johnson',
        memberEmail: 'mike@example.com',
        memberPhone: '+0987654321',
        houseName: 'Johnson House',
        preferredDate: '2024-01-28',
        numberOfGuests: 6,
        status: 'completed',
        requestedAt: '2024-01-15T08:45:00',
        updatedAt: '2024-01-28T18:00:00',
        completedAt: '2024-01-28T18:00:00',
        updatedBy: 'Admin',
        notes: 'Event went well, great participation'
      },
      {
        id: '4',
        memberId: 'm4',
        memberName: 'Sarah Williams',
        memberEmail: 'sarah@example.com',
        houseName: 'Williams Residence',
        preferredDate: '2024-02-18',
        alternativeDate: '2024-02-25',
        numberOfGuests: 10,
        specialRequests: 'Need parking space for 5 cars',
        status: 'proposed',
        requestedAt: '2024-01-22T16:00:00',
        updatedAt: '2024-01-22T16:00:00'
      }
    ];

    // Sort by request time (newest first)
    const sortedRequests = mockRequests.sort((a, b) => 
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );

    setTimeout(() => {
      setRequests(sortedRequests);
      setFilteredRequests(sortedRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter requests based on status and search term
  useEffect(() => {
    let filtered = [...requests];

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(request => request.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.houseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.memberEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [selectedStatus, searchTerm, requests]);

  const handleStatusUpdate = async (requestId: string, updateData: StatusUpdateData) => {
    try {
      // TODO: API call to update status
      const updatedRequests = requests.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            status: updateData.status,
            notes: updateData.notes || request.notes,
            updatedAt: new Date().toISOString(),
            updatedBy: 'Admin',
            completedAt: updateData.status === 'completed' ? new Date().toISOString() : request.completedAt
          };
        }
        return request;
      });

      setRequests(updatedRequests);
      setIsStatusModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status: SundayTreatRequest['status']) => {
    const colors = {
      proposed: 'bg-blue-100 text-blue-700 border-blue-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      completed: 'bg-gray-100 text-gray-700 border-gray-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status];
  };

  const statusOptions = [
    { value: 'all', label: 'All Requests', count: requests.length },
    { value: 'proposed', label: 'Proposed', count: requests.filter(r => r.status === 'proposed').length },
    { value: 'approved', label: 'Approved', count: requests.filter(r => r.status === 'approved').length },
    { value: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: requests.filter(r => r.status === 'cancelled').length }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sunday Treat Requests</h1>
        <p className="text-gray-600 mt-1">Manage member requests for hosting Sunday treats</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions.slice(1).map((option) => (
          <div key={option.value} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{option.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{option.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(option.value as SundayTreatRequest['status'])}`}>
                <Coffee className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, house, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedStatus === option.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                  {option.count > 0 && (
                    <span className="ml-2 text-sm">({option.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <Coffee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'No Sunday treat requests yet'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <SundayTreatCard
              key={request.id}
              request={request}
              onStatusChange={() => {
                setSelectedRequest(request);
                setIsStatusModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Status Update Modal */}
      {selectedRequest && (
        <StatusUpdateModal
          isOpen={isStatusModalOpen}
          onClose={() => {
            setIsStatusModalOpen(false);
            setSelectedRequest(null);
          }}
          request={selectedRequest}
          onUpdate={(updateData) => handleStatusUpdate(selectedRequest.id, updateData)}
        />
      )}
    </div>
  );
};

export default SundayTreatInterests;
