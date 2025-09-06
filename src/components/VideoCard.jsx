import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, User } from 'lucide-react';

const VideoCard = ({ video, onClick }) => {
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(video)}
    >
      <div className="relative">
        <img
          src={getThumbnailUrl(video.videoId)}
          alt={video.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
          }}
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-gray-900 ml-1" />
          </div>
        </div>
        
        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {video.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{video.instructor}</span>
          </div>
          
          {video.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(video.duration)}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
