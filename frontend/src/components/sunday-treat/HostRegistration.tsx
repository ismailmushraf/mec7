import React, { useState } from 'react';
import { CheckCircle, Info, Heart } from 'lucide-react';

interface HostRegistrationFormProps {
  onSubmit?: (data: { date: string; location: string }) => Promise<void> | void;
}

const HostRegistrationForm: React.FC<HostRegistrationFormProps> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !location) return;

    setIsSubmitting(true);
    
    try {
      // Call the parent's onSubmit if provided
      if (onSubmit) {
        await onSubmit({ date: selectedDate, location });
      }
      
      setShowSuccessMessage(true);
      setSelectedDate('');
      setLocation('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get next 4 Sundays for date selection
  const getNextSundays = () => {
    const sundays = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
    
    for (let i = 0; i < 4; i++) {
      const nextSunday = new Date(today);
      nextSunday.setDate(today.getDate() + daysUntilSunday + (i * 7));
      sundays.push(nextSunday.toISOString().split('T')[0]);
    }
    
    return sundays;
  };

  const availableSundays = getNextSundays();

  return (
    <>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">
            Thank you for registering! We'll confirm your slot soon and send you more details.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Sunday Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              required
            >
              <option value="">Choose a date</option>
              {availableSundays.map(date => {
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                return (
                  <option key={date} value={date}>
                    {formattedDate}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Community Center, Park Pavilion"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] transition-colors"
              required
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">What's Expected:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide healthy snacks/drinks for 20-30 members</li>
              <li>Setup starts at 8:30 AM (after workout)</li>
              <li>We'll help coordinate and promote your treat</li>
              <li>Budget guidelines and suggestions will be provided</li>
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-[#15B1F1] text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Register to Host
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default HostRegistrationForm;
