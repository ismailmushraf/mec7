import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import type { SundayTreatRequest, StatusUpdateData } from '../../types/types';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: SundayTreatRequest;
  onUpdate: (updateData: StatusUpdateData) => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  isOpen,
  onClose,
  request,
  onUpdate
}) => {
  const [status, setStatus] = useState<SundayTreatRequest['status']>(request.status);
  const [notes, setNotes] = useState(request.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    try {
      onUpdate({ status, notes });
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusDescription = (status: SundayTreatRequest['status']) => {
    const descriptions = {
      proposed: 'Initial request from member, awaiting admin review',
      approved: 'Request approved, event scheduled for the selected date',
      completed: 'Event successfully completed',
      cancelled: 'Request cancelled by admin or member'
    };
    return descriptions[status];
  };

  const statusOptions: Array<{ value: SundayTreatRequest['status']; label: string; color: string }> = [
    { value: 'proposed', label: 'Proposed', color: 'text-blue-600' },
    { value: 'approved', label: 'Approved', color: 'text-green-600' },
    { value: 'completed', label: 'Completed', color: 'text-gray-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-600' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal Container - Updated for better mobile support */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            {/* Header - Now sticky on mobile */}
            <div className="sticky top-0 bg-white rounded-t-lg flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 z-10">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Update Request Status</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{request.memberName} - {request.houseName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Current Status Info */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Current Status</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">{request.status}</p>
                </div>

                {/* New Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    Change Status To
                  </label>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                          status === option.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={status === option.value}
                          onChange={(e) => setStatus(e.target.value as SundayTreatRequest['status'])}
                          className="mt-0.5 sm:mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm sm:text-base font-medium ${option.color}`}>{option.label}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                            {getStatusDescription(option.value)}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add any additional notes about this status change..."
                  />
                </div>

                {/* Warning for cancellation */}
                {status === 'cancelled' && request.status !== 'cancelled' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex gap-3">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-red-800">
                        Are you sure you want to cancel this request?
                      </p>
                      <p className="text-xs sm:text-sm text-red-600 mt-1">
                        This action will notify the member about the cancellation.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Footer - Now sticky on mobile */}
            <div className="sticky bottom-0 bg-gray-50 rounded-b-lg flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isUpdating || status === request.status}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusUpdateModal;
