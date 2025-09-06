export const courseCategories = [
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
        videoId: 'dQw4w9WgXcQ', // Rick Roll als Beispiel
        instructor: 'Dr. Anna Schmidt',
        duration: 1800, // 30 Minuten
        category: 'mathematik',
        difficulty: 'Anfänger'
      },
      {
        id: 2,
        title: 'Differentialrechnung',
        description: 'Verstehen Sie Ableitungen und ihre Anwendungen',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Prof. Max Müller',
        duration: 2400, // 40 Minuten
        category: 'mathematik',
        difficulty: 'Fortgeschritten'
      },
      {
        id: 3,
        title: 'Geometrie und Trigonometrie',
        description: 'Winkel, Dreiecke und trigonometrische Funktionen',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Dr. Sarah Weber',
        duration: 2100, // 35 Minuten
        category: 'mathematik',
        difficulty: 'Mittel'
      }
    ]
  },
  {
    id: 'physik',
    name: 'Physik',
    description: 'Die Gesetze der Natur verstehen',
    icon: '⚛️',
    color: 'bg-green-500',
    videos: [
      {
        id: 4,
        title: 'Mechanik - Newtons Gesetze',
        description: 'Grundlagen der klassischen Mechanik',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Dr. Thomas Klein',
        duration: 2700, // 45 Minuten
        category: 'physik',
        difficulty: 'Anfänger'
      },
      {
        id: 5,
        title: 'Elektromagnetismus',
        description: 'Elektrische und magnetische Felder',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Prof. Lisa Hoffmann',
        duration: 3000, // 50 Minuten
        category: 'physik',
        difficulty: 'Fortgeschritten'
      }
    ]
  },
  {
    id: 'chemie',
    name: 'Chemie',
    description: 'Atome, Moleküle und chemische Reaktionen',
    icon: '🧪',
    color: 'bg-purple-500',
    videos: [
      {
        id: 6,
        title: 'Periodensystem der Elemente',
        description: 'Verstehen Sie die Struktur des Periodensystems',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Dr. Michael Bauer',
        duration: 1800, // 30 Minuten
        category: 'chemie',
        difficulty: 'Anfänger'
      },
      {
        id: 7,
        title: 'Organische Chemie',
        description: 'Kohlenstoffverbindungen und Reaktionen',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Prof. Julia Fischer',
        duration: 3600, // 60 Minuten
        category: 'chemie',
        difficulty: 'Fortgeschritten'
      }
    ]
  },
  {
    id: 'biologie',
    name: 'Biologie',
    description: 'Das Leben und seine Prozesse',
    icon: '🧬',
    color: 'bg-red-500',
    videos: [
      {
        id: 8,
        title: 'Zellbiologie',
        description: 'Aufbau und Funktion von Zellen',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Dr. Petra Wagner',
        duration: 2400, // 40 Minuten
        category: 'biologie',
        difficulty: 'Mittel'
      },
      {
        id: 9,
        title: 'Genetik und Vererbung',
        description: 'DNA, Gene und Vererbungslehre',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Prof. Andreas Richter',
        duration: 3000, // 50 Minuten
        category: 'biologie',
        difficulty: 'Fortgeschritten'
      }
    ]
  },
  {
    id: 'deutsch',
    name: 'Deutsch',
    description: 'Sprache, Literatur und Kommunikation',
    icon: '📚',
    color: 'bg-yellow-500',
    videos: [
      {
        id: 10,
        title: 'Grammatik Grundlagen',
        description: 'Zeiten, Fälle und Satzbau',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Dr. Maria Schulz',
        duration: 2100, // 35 Minuten
        category: 'deutsch',
        difficulty: 'Anfänger'
      },
      {
        id: 11,
        title: 'Literaturanalyse',
        description: 'Texte verstehen und interpretieren',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Prof. Klaus Neumann',
        duration: 2700, // 45 Minuten
        category: 'deutsch',
        difficulty: 'Fortgeschritten'
      }
    ]
  },
  {
    id: 'englisch',
    name: 'Englisch',
    description: 'Englische Sprache und Kultur',
    icon: '🇬🇧',
    color: 'bg-indigo-500',
    videos: [
      {
        id: 12,
        title: 'Englische Grammatik',
        description: 'Verbzeiten und Satzstrukturen',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'Sarah Johnson',
        duration: 1800, // 30 Minuten
        category: 'englisch',
        difficulty: 'Anfänger'
      },
      {
        id: 13,
        title: 'Business English',
        description: 'Englisch für den Beruf',
        videoId: 'dQw4w9WgXcQ',
        instructor: 'John Smith',
        duration: 2400, // 40 Minuten
        category: 'englisch',
        difficulty: 'Mittel'
      }
    ]
  }
];

export const getVideosByCategory = (categoryId) => {
  const category = courseCategories.find(cat => cat.id === categoryId);
  return category ? category.videos : [];
};

export const getAllVideos = () => {
  return courseCategories.flatMap(category => category.videos);
};

export const getCategoryById = (categoryId) => {
  return courseCategories.find(cat => cat.id === categoryId);
};
