import React from 'react';
import { Calendar, Users, Clock, Phone, Mail, Home, FileText } from 'lucide-react';
import type { SundayTreatRequest } from '../../types/types';

interface SundayTreatCardProps {
  request: SundayTreatRequest;
  onStatusChange: () => void;
}

const SundayTreatCard: React.FC<SundayTreatCardProps> = ({ request, onStatusChange }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: SundayTreatRequest['status']) => {
    const colors = {
      proposed: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Main Info */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{request.memberName}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Home className="h-4 w-4" />
                {request.houseName}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${request.memberEmail}`} className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
              <Mail className="h-4 w-4" />
              {request.memberEmail}
            </a>
            {request.memberPhone && (
              <a href={`tel:${request.memberPhone}`} className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
                <Phone className="h-4 w-4" />
                {request.memberPhone}
              </a>
            )}
          </div>
          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDate(request.preferredDate)}
              </p>
            </div>
            
            {request.alternativeDate && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Alternative Date</p>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(request.alternativeDate)}
                </p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Number of Guests</p>
              <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-400" />
                {request.numberOfGuests} guests
              </p>
            </div>
          </div>

          {/* Special Requests */}
          {request.specialRequests && (
            <div>
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Special Requests
              </p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {request.specialRequests}
              </p>
            </div>
          )}

          {/* Notes */}
          {request.notes && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
              <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                {request.notes}
              </p>
            </div>
          )}

          {/* Timeline */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Requested: {formatDateTime(request.requestedAt)}
            </div>
            {request.updatedAt !== request.requestedAt && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Updated: {formatDateTime(request.updatedAt)}
                {request.updatedBy && ` by ${request.updatedBy}`}
              </div>
            )}
            {request.completedAt && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Completed: {formatDateTime(request.completedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-start">
          <button
            onClick={onStatusChange}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default SundayTreatCard;
