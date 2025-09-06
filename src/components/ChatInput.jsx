import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile } from 'lucide-react';

const ChatInput = ({ onSendMessage, onSendFile, disabled = false }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && !disabled) {
      onSendFile(file);
      e.target.value = ''; // Reset file input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-gray-200 bg-white p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
        
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreiben Sie eine Nachricht..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      
      {/* Typing Indicator */}
      {disabled && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          Verbindung wird hergestellt...
        </div>
      )}
    </motion.div>
  );
};

export default ChatInput;
