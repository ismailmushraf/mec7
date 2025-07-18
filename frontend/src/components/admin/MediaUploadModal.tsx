import React, { useState, useRef } from 'react';
import { X, Upload, Image, Video, Plus } from 'lucide-react';
import type { Media } from '../../types/types';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (media: Media[]) => void;
  eventId?: string;
  eventName?: string;
}

interface FilePreview {
  file: File;
  preview: string;
  name: string;
  type: 'photo' | 'video';
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  eventId,
  eventName = 'Event'
}) => {
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const newFiles: FilePreview[] = selectedFiles.map((file, index) => {
      const isVideo = file.type.startsWith('video/');
      const name = uploadMode === 'bulk' 
        ? `${eventName} ${files.length + index + 1}`
        : file.name.split('.')[0];

      return {
        file,
        preview: isVideo ? '' : URL.createObjectURL(file),
        name,
        type: isVideo ? 'video' : 'photo'
      };
    });

    setFiles([...files, ...newFiles]);
  };

  const updateFileName = (index: number, name: string) => {
    const updatedFiles = [...files];
    updatedFiles[index].name = name;
    setFiles(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    if (updatedFiles[index].preview) {
      URL.revokeObjectURL(updatedFiles[index].preview);
    }
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      // TODO: Implement actual file upload to your backend
      // For now, we'll simulate the upload
      const uploadedMedia: Media[] = files.map((file, index) => ({
        id: Date.now().toString() + index,
        name: file.name,
        url: file.preview || 'https://via.placeholder.com/400x300',
        type: file.type,
        eventId,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Admin',
        size: file.file.size,
        thumbnailUrl: file.preview || 'https://via.placeholder.com/150x150'
      }));

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      onUpload(uploadedMedia);
      handleClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    // Clean up previews
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setUploadMode('single');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upload Media</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Upload Mode Selection */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button
                onClick={() => setUploadMode('single')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  uploadMode === 'single'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-medium mb-1">Single Upload</h3>
                <p className="text-sm opacity-75">Upload with custom names</p>
              </button>
              <button
                onClick={() => setUploadMode('bulk')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  uploadMode === 'bulk'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-medium mb-1">Bulk Upload</h3>
                <p className="text-sm opacity-75">Auto-name with sequence</p>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {files.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                    Select Files
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File List */}
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {/* Preview */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {file.type === 'photo' ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={file.name}
                        onChange={(e) => updateFileName(index, e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={uploadMode === 'bulk'}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {file.type === 'photo' ? 'Photo' : 'Video'} • {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                ))}

                {/* Add More Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
                >
                  <Plus className="h-5 w-5" />
                  Add More Files
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              {files.length} file{files.length !== 1 && 's'} selected
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaUploadModal;
