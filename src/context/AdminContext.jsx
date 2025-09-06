import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin muss innerhalb eines AdminProvider verwendet werden');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [appSettings, setAppSettings] = useState({
    appName: 'KursApp',
    appDescription: 'Ihre moderne Lernplattform mit interaktiven Videos und direkter Kommunikation',
    welcomeMessage: 'Willkommen bei KursApp',
    footerText: 'Entwickelt mit ❤️ für moderne Bildung',
    contactEmail: 'kontakt@kursapp.de',
    supportHours: '9:00-17:00 Uhr'
  });

  useEffect(() => {
    // Lade gespeicherte Daten aus localStorage
    const savedCourses = localStorage.getItem('kursapp_courses');
    const savedSettings = localStorage.getItem('kursapp_settings');
    
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Lade Standard-Kurse
      const defaultCourses = [
        {
          id: 'mathematik',
          name: 'Mathematik',
          description: 'Von Grundlagen bis zu fortgeschrittenen Konzepten',
          icon: '📊',
          color: 'bg-blue-500',
          videos: [
            {
              id: 1,
              title: 'Grundlagen der Algebra',
              description: 'Einführung in die Grundlagen der Algebra für Anfänger',
              videoId: 'dQw4w9WgXcQ',
              instructor: 'Dr. Anna Schmidt',
              duration: 1800,
              category: 'mathematik',
              difficulty: 'Anfänger'
            }
          ]
        }
      ];
      setCourses(defaultCourses);
    }
    
    if (savedSettings) {
      setAppSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveCourses = (newCourses) => {
    setCourses(newCourses);
    localStorage.setItem('kursapp_courses', JSON.stringify(newCourses));
    toast.success('Kurse erfolgreich gespeichert!');
  };

  const saveSettings = (newSettings) => {
    setAppSettings(newSettings);
    localStorage.setItem('kursapp_settings', JSON.stringify(newSettings));
    toast.success('Einstellungen erfolgreich gespeichert!');
  };

  const addCategory = (category) => {
    const newCategory = {
      id: Date.now().toString(),
      ...category,
      videos: []
    };
    const updatedCourses = [...courses, newCategory];
    saveCourses(updatedCourses);
  };

  const updateCategory = (categoryId, updates) => {
    const updatedCourses = courses.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    saveCourses(updatedCourses);
  };

  const deleteCategory = (categoryId) => {
    const updatedCourses = courses.filter(cat => cat.id !== categoryId);
    saveCourses(updatedCourses);
  };

  const addVideo = (categoryId, video) => {
    const newVideo = {
      id: Date.now(),
      ...video
    };
    const updatedCourses = courses.map(cat => 
      cat.id === categoryId 
        ? { ...cat, videos: [...cat.videos, newVideo] }
        : cat
    );
    saveCourses(updatedCourses);
  };

  const updateVideo = (categoryId, videoId, updates) => {
    const updatedCourses = courses.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            videos: cat.videos.map(video => 
              video.id === videoId ? { ...video, ...updates } : video
            )
          }
        : cat
    );
    saveCourses(updatedCourses);
  };

  const deleteVideo = (categoryId, videoId) => {
    const updatedCourses = courses.map(cat => 
      cat.id === categoryId 
        ? { ...cat, videos: cat.videos.filter(video => video.id !== videoId) }
        : cat
    );
    saveCourses(updatedCourses);
  };

  const value = {
    courses,
    appSettings,
    addCategory,
    updateCategory,
    deleteCategory,
    addVideo,
    updateVideo,
    deleteVideo,
    saveSettings
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
