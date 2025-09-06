import React from 'react';
import { motion } from 'framer-motion';
import { User, Circle } from 'lucide-react';

const OnlineUsers = ({ users }) => {
  const onlineUsers = users.filter(user => user.isOnline);
  const offlineUsers = users.filter(user => !user.isOnline);

  return (
    <div className="bg-white border-l border-gray-200 p-4 h-full overflow-y-auto">
      <h3 className="font-semibold text-gray-900 mb-4">Teilnehmer</h3>
      
      {/* Online Users */}
      {onlineUsers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Circle className="w-3 h-3 text-green-500 mr-2" />
            Online ({onlineUsers.length})
          </h4>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.role === 'teacher' ? 'bg-green-500' : 'bg-primary-500'
                  }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <Circle className="absolute -bottom-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role === 'teacher' ? 'Lehrer' : 'Schüler'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Offline Users */}
      {offlineUsers.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Circle className="w-3 h-3 text-gray-400 mr-2" />
            Offline ({offlineUsers.length})
          </h4>
          <div className="space-y-2">
            {offlineUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3 p-2 rounded-lg opacity-60"
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.role === 'teacher' ? 'bg-green-500' : 'bg-primary-500'
                  }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <Circle className="absolute -bottom-1 -right-1 w-3 h-3 text-gray-400 bg-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role === 'teacher' ? 'Lehrer' : 'Schüler'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;
