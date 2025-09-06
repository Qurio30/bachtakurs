import React from 'react';
import { motion } from 'framer-motion';
import { User, Download, FileText } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isOwnMessage = message.senderId === 'current-user';
  const isTeacher = message.isTeacher;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageStyle = () => {
    if (isOwnMessage) {
      return 'bg-primary-600 text-white ml-auto';
    } else if (isTeacher) {
      return 'bg-green-100 text-green-900 border border-green-200';
    } else {
      return 'bg-gray-100 text-gray-900';
    }
  };

  const getAvatarColor = () => {
    if (isTeacher) {
      return 'bg-green-500';
    } else if (isOwnMessage) {
      return 'bg-primary-500';
    } else {
      return 'bg-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getAvatarColor()} flex items-center justify-center`}>
          <User className="w-4 h-4 text-white" />
        </div>
        
        {/* Message Content */}
        <div className={`mx-3 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          <div className={`px-4 py-2 rounded-lg ${getMessageStyle()}`}>
            {message.type === 'file' ? (
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <div>
                  <p className="font-medium">{message.fileName}</p>
                  <p className="text-xs opacity-75">
                    {(message.fileSize / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Download className="w-4 h-4 cursor-pointer hover:opacity-75" />
              </div>
            ) : (
              <p className="text-sm">{message.text}</p>
            )}
          </div>
          
          {/* Message Info */}
          <div className={`mt-1 text-xs text-gray-500 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            <span className="font-medium">{message.sender}</span>
            {isTeacher && (
              <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                Lehrer
              </span>
            )}
            <span className="ml-2">{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
