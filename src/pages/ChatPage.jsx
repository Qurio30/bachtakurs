import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import OnlineUsers from '../components/OnlineUsers';
import { MessageCircle, Users, Wifi, WifiOff } from 'lucide-react';

const ChatPage = () => {
  const { messages, onlineUsers, isConnected, sendMessage, sendFile } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
                <p className="text-gray-600">Kommunizieren Sie mit Lehrern und anderen Schülern</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <>
                    <Wifi className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">Verbunden</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-600">Getrennt</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{onlineUsers.filter(user => user.isOnline).length} online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Willkommen im Chat!
                      </h3>
                      <p className="text-gray-600">
                        Beginnen Sie eine Unterhaltung mit Ihren Lehrern oder Mitschülern.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <ChatInput
                onSendMessage={sendMessage}
                onSendFile={sendFile}
                disabled={!isConnected}
              />
            </div>
            
            {/* Online Users Sidebar */}
            <div className="w-80 border-l border-gray-200">
              <OnlineUsers users={onlineUsers} />
            </div>
          </div>
        </div>
        
        {/* Chat Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tipp</h4>
            <p className="text-sm text-blue-800">
              Stellen Sie spezifische Fragen zu den Kursinhalten für bessere Hilfe.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">📎 Dateien</h4>
            <p className="text-sm text-green-800">
              Teilen Sie Screenshots oder Dokumente für bessere Unterstützung.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">⏰ Verfügbarkeit</h4>
            <p className="text-sm text-purple-800">
              Lehrer sind normalerweise von 9:00-17:00 Uhr erreichbar.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;
