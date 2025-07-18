import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, Users } from 'lucide-react';
import type { Member } from '../../types/types';

interface MemberSelectorProps {
  members: Member[];
  selectedMembers: string[];
  onSelectionChange: (selectedMembers: string[]) => void;
}

const MemberSelector: React.FC<MemberSelectorProps> = ({
  members,
  selectedMembers,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMember = (memberId: string) => {
    const newSelection = selectedMembers.includes(memberId)
      ? selectedMembers.filter(id => id !== memberId)
      : [...selectedMembers, memberId];
    onSelectionChange(newSelection);
  };

  const selectAll = () => {
    onSelectionChange(members.map(m => m.id));
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const getSelectedMembersDisplay = () => {
    if (selectedMembers.length === 0) {
      return 'Select members';
    }
    if (selectedMembers.length === members.length) {
      return `All members selected (${members.length})`;
    }
    return `${selectedMembers.length} member${selectedMembers.length !== 1 ? 's' : ''} selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className={selectedMembers.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
            {getSelectedMembersDisplay()}
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={selectAll}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearSelection}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Clear
            </button>
          </div>

          {/* Member List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredMembers.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No members found
              </div>
            ) : (
              <div className="py-1">
                {filteredMembers.map((member) => {
                  const isSelected = selectedMembers.includes(member.id);
                  
                  return (
                    <label
                      key={member.id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleMember(member.id)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {member.email}
                        </p>
                      </div>
                      {member.role === 'leader' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Leader
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Members Display */}
          {selectedMembers.length > 0 && (
            <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedMembers.length} selected
                </span>
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {selectedMembers.slice(0, 3).map(memberId => {
                    const member = members.find(m => m.id === memberId);
                    if (!member) return null;
                    
                    return (
                      <span
                        key={memberId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        {member.name.split(' ')[0]}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMember(memberId);
                          }}
                          className="hover:text-indigo-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  {selectedMembers.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{selectedMembers.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberSelector;
