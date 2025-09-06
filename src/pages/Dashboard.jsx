import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import CategoryCard from '../components/CategoryCard';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import { Search, Filter, Grid, List, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { courses, appSettings } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedVideo(null);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedVideo(null);
  };

  const handleBackToVideos = () => {
    setSelectedVideo(null);
  };

  const filteredVideos = selectedCategory ? 
    selectedCategory.videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || video.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    }) : [];

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBackToVideos}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zu {selectedCategory.name}</span>
          </button>
          
          <VideoPlayer
            videoId={selectedVideo.videoId}
            title={selectedVideo.title}
            description={selectedVideo.description}
          />
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBackToCategories}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zu allen Kategorien</span>
          </button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory.name}
            </h1>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Videos durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="input-field pl-10 pr-8"
                >
                  <option value="all">Alle Schwierigkeitsgrade</option>
                  <option value="Anfänger">Anfänger</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Fortgeschritten">Fortgeschritten</option>
                </select>
              </div>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Videos Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={handleVideoSelect}
              />
            ))}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Keine Videos gefunden.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {appSettings.welcomeMessage}, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {appSettings.appDescription}
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCategorySelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
