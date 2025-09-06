import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { BookOpen, Users, Video, MessageCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Willkommen bei KursApp
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ihre moderne Lernplattform mit interaktiven Videos und direkter Kommunikation
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    YouTube Video Integration
                  </h3>
                  <p className="text-gray-600">
                    Sehen Sie sich Lernvideos direkt in der App an - nahtlos integriert
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verschiedene Kursbereiche
                  </h3>
                  <p className="text-gray-600">
                    Organisierte Kategorien für strukturiertes Lernen
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Direkte Kommunikation
                  </h3>
                  <p className="text-gray-600">
                    Chatten Sie direkt mit Lehrern und anderen Schülern
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Benutzerfreundlich
                  </h3>
                  <p className="text-gray-600">
                    Intuitive Benutzeroberfläche für optimale Lernerfahrung
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <RegisterForm onToggleMode={toggleMode} />}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
