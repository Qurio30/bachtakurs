import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Video, 
  BookOpen,
  Palette,
  Type,
  Globe
} from 'lucide-react';

const AdminPanel = ({ isOpen, onClose }) => {
  const { 
    courses, 
    appSettings, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    addVideo,
    updateVideo,
    deleteVideo,
    saveSettings 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '📚',
    color: 'bg-blue-500'
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoId: '',
    instructor: '',
    duration: 0,
    difficulty: 'Anfänger'
  });

  const [settings, setSettings] = useState(appSettings);

  const colorOptions = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
  ];

  const iconOptions = [
    '📊', '⚛️', '🧪', '🧬', '📚', '🇬🇧', '🎨', '💻',
    '🔬', '📐', '🌍', '🎵', '🏃', '🍳', '🎭', '🚀'
  ];

  const handleSaveSettings = () => {
    saveSettings(settings);
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      addCategory(newCategory);
      setNewCategory({ name: '', description: '', icon: '📚', color: 'bg-blue-500' });
      setShowAddCategory(false);
    }
  };

  const handleAddVideo = (categoryId) => {
    if (newVideo.title && newVideo.videoId) {
      addVideo(categoryId, { ...newVideo, category: categoryId });
      setNewVideo({ title: '', description: '', videoId: '', instructor: '', duration: 0, difficulty: 'Anfänger' });
      setShowAddVideo(null);
    }
  };

  const handleUpdateCategory = (categoryId) => {
    updateCategory(categoryId, editingCategory);
    setEditingCategory(null);
  };

  const handleUpdateVideo = (categoryId, videoId) => {
    updateVideo(categoryId, videoId, editingVideo);
    setEditingVideo(null);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6" />
            <h2 className="text-xl font-bold">Admin-Panel</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'settings' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>App-Einstellungen</span>
              </button>
              
              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'categories' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Kategorien</span>
              </button>
              
              <button
                onClick={() => setActiveTab('videos')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'videos' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Video className="w-5 h-5" />
                <span>Videos</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">App-Einstellungen</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      App-Name
                    </label>
                    <input
                      type="text"
                      value={settings.appName}
                      onChange={(e) => setSettings({...settings, appName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kontakt-E-Mail
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      App-Beschreibung
                    </label>
                    <textarea
                      value={settings.appDescription}
                      onChange={(e) => setSettings({...settings, appDescription: e.target.value})}
                      className="input-field"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Willkommensnachricht
                    </label>
                    <input
                      type="text"
                      value={settings.welcomeMessage}
                      onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support-Zeiten
                    </label>
                    <input
                      type="text"
                      value={settings.supportHours}
                      onChange={(e) => setSettings({...settings, supportHours: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Footer-Text
                    </label>
                    <input
                      type="text"
                      value={settings.footerText}
                      onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <button onClick={handleSaveSettings} className="btn-primary">
                  <Save className="w-5 h-5 mr-2" />
                  Einstellungen speichern
                </button>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Kategorien verwalten</h3>
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="btn-primary"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Neue Kategorie
                  </button>
                </div>

                {showAddCategory && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Neue Kategorie hinzufügen</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                          className="input-field"
                          placeholder="z.B. Mathematik"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Beschreibung
                        </label>
                        <input
                          type="text"
                          value={newCategory.description}
                          onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                          className="input-field"
                          placeholder="Kurze Beschreibung"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                          {iconOptions.map(icon => (
                            <button
                              key={icon}
                              onClick={() => setNewCategory({...newCategory, icon})}
                              className={`p-2 text-2xl rounded-lg border-2 ${
                                newCategory.icon === icon ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                              }`}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Farbe
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {colorOptions.map(color => (
                            <button
                              key={color}
                              onClick={() => setNewCategory({...newCategory, color})}
                              className={`w-8 h-8 rounded-lg border-2 ${
                                newCategory.color === color ? 'border-gray-800' : 'border-gray-200'
                              } ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      <button onClick={handleAddCategory} className="btn-primary">
                        <Save className="w-5 h-5 mr-2" />
                        Speichern
                      </button>
                      <button onClick={() => setShowAddCategory(false)} className="btn-secondary">
                        Abbrechen
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map(category => (
                    <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{category.icon}</span>
                          <h4 className="font-semibold">{category.name}</h4>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-1 text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{category.videos.length} Videos</span>
                        <button
                          onClick={() => setShowAddVideo(category.id)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Videos verwalten</h3>
                
                {courses.map(category => (
                  <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </h4>
                    
                    {showAddVideo === category.id && (
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h5 className="font-medium mb-3">Neues Video hinzufügen</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Titel
                            </label>
                            <input
                              type="text"
                              value={newVideo.title}
                              onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              YouTube Video ID
                            </label>
                            <input
                              type="text"
                              value={newVideo.videoId}
                              onChange={(e) => setNewVideo({...newVideo, videoId: e.target.value})}
                              className="input-field"
                              placeholder="z.B. dQw4w9WgXcQ"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Dozent
                            </label>
                            <input
                              type="text"
                              value={newVideo.instructor}
                              onChange={(e) => setNewVideo({...newVideo, instructor: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Schwierigkeit
                            </label>
                            <select
                              value={newVideo.difficulty}
                              onChange={(e) => setNewVideo({...newVideo, difficulty: e.target.value})}
                              className="input-field"
                            >
                              <option value="Anfänger">Anfänger</option>
                              <option value="Mittel">Mittel</option>
                              <option value="Fortgeschritten">Fortgeschritten</option>
                            </select>
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Beschreibung
                            </label>
                            <textarea
                              value={newVideo.description}
                              onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                              className="input-field"
                              rows="2"
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <button onClick={() => handleAddVideo(category.id)} className="btn-primary">
                            <Save className="w-5 h-5 mr-2" />
                            Video hinzufügen
                          </button>
                          <button onClick={() => setShowAddVideo(null)} className="btn-secondary">
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {category.videos.map(video => (
                        <div key={video.id} className="bg-white p-3 rounded-lg flex items-center justify-between">
                          <div className="flex-1">
                            <h6 className="font-medium">{video.title}</h6>
                            <p className="text-sm text-gray-600">{video.instructor} • {video.difficulty}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingVideo(video)}
                              className="p-1 text-gray-500 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteVideo(category.id, video.id)}
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {category.videos.length === 0 && (
                        <p className="text-gray-500 text-center py-4">Keine Videos in dieser Kategorie</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
