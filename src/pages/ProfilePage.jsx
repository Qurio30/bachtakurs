import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Award, BookOpen, MessageCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Leidenschaftlicher Lerner mit Interesse an verschiedenen Fächern.',
    interests: ['Mathematik', 'Physik', 'Programmierung'],
    joinDate: 'Januar 2024'
  });

  const handleSave = () => {
    // In einer echten App würde hier die API aufgerufen werden
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Leidenschaftlicher Lerner mit Interesse an verschiedenen Fächern.',
      interests: ['Mathematik', 'Physik', 'Programmierung'],
      joinDate: 'Januar 2024'
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Videos angeschaut', value: '24', icon: BookOpen },
    { label: 'Chat-Nachrichten', value: '156', icon: MessageCircle },
    { label: 'Kurse abgeschlossen', value: '8', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil</h1>
          <p className="text-gray-600">Verwalten Sie Ihre Kontoinformationen und Einstellungen</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Persönliche Informationen</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Bearbeiten
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profileData.name}
                    </h3>
                    <p className="text-gray-600">
                      {user?.role === 'teacher' ? 'Lehrer' : 'Schüler'}
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vollständiger Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <User className="w-4 h-4" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail-Adresse
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Mail className="w-4 h-4" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Über mich
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="input-field"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interessensgebiete
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <button onClick={handleSave} className="btn-primary">
                      Speichern
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                      Abbrechen
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats and Info */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiken</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-gray-700">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontoinformationen</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Mitglied seit {profileData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">
                    {user?.role === 'teacher' ? 'Lehrer-Account' : 'Schüler-Account'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
