import React, { useState } from 'react';
import { Image, Video, Trash2, Download, Eye } from 'lucide-react';
import type { Media } from '../../types/types';

interface MediaCardProps {
  media: Media;
  onDelete: (mediaId: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const handleDownload = () => {
    // TODO: Implement download functionality
    window.open(media.url, '_blank');
  };

  return (
    <div className="relative group">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {media.type === 'photo' ? (
          imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
          ) : (
            <img
              src={media.thumbnailUrl || media.url}
              alt={media.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
            <Video className="h-12 w-12 text-white mb-2" />
            <span className="text-xs text-gray-300">Video</span>
          </div>
        )}
      </div>

      {/* Overlay with actions */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex gap-2">
          <button
            onClick={() => window.open(media.url, '_blank')}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            title="View"
          >
            <Eye className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={() => onDelete(media.id)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Media name */}
      <p className="mt-2 text-sm text-gray-700 truncate">{media.name}</p>
      <p className="text-xs text-gray-500">
        {media.type === 'photo' ? 'Photo' : 'Video'}
      </p>
    </div>
  );
};

export default MediaCard;
