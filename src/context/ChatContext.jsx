import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat muss innerhalb eines ChatProvider verwendet werden');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simuliere WebSocket-Verbindung
    setIsConnected(true);
    
    // Demo-Nachrichten laden
    const demoMessages = [
      {
        id: 1,
        text: 'Willkommen im Chat! Wie kann ich Ihnen helfen?',
        sender: 'Dr. Anna Schmidt',
        senderId: 'teacher-1',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        isTeacher: true
      },
      {
        id: 2,
        text: 'Hallo! Ich habe eine Frage zur Algebra-Lektion.',
        sender: 'Max Mustermann',
        senderId: 'student-1',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text',
        isTeacher: false
      },
      {
        id: 3,
        text: 'Gerne! Welche spezifische Frage haben Sie?',
        sender: 'Dr. Anna Schmidt',
        senderId: 'teacher-1',
        timestamp: new Date(Date.now() - 2400000),
        type: 'text',
        isTeacher: true
      }
    ];
    
    setMessages(demoMessages);
    
    // Demo-Online-Benutzer
    setOnlineUsers([
      { id: 'teacher-1', name: 'Dr. Anna Schmidt', role: 'teacher', isOnline: true },
      { id: 'teacher-2', name: 'Prof. Max Müller', role: 'teacher', isOnline: true },
      { id: 'student-1', name: 'Max Mustermann', role: 'student', isOnline: true },
      { id: 'student-2', name: 'Lisa Weber', role: 'student', isOnline: false }
    ]);
  }, []);

  const sendMessage = async (text, type = 'text') => {
    try {
      const newMessage = {
        id: Date.now(),
        text,
        sender: 'Sie', // In einer echten App würde hier der Benutzername stehen
        senderId: 'current-user',
        timestamp: new Date(),
        type,
        isTeacher: false // In einer echten App würde hier die Benutzerrolle geprüft
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Simuliere Antwort vom Lehrer
      setTimeout(() => {
        const responses = [
          'Das ist eine sehr gute Frage! Lassen Sie mich das erklären...',
          'Ich verstehe Ihr Problem. Hier ist die Lösung:',
          'Gerne helfe ich Ihnen dabei. Schauen wir uns das gemeinsam an.',
          'Das ist ein wichtiger Punkt. Hier sind die Details:'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const teacherResponse = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'Dr. Anna Schmidt',
          senderId: 'teacher-1',
          timestamp: new Date(),
          type: 'text',
          isTeacher: true
        };
        
        setMessages(prev => [...prev, teacherResponse]);
      }, 2000);
      
    } catch (error) {
      toast.error('Fehler beim Senden der Nachricht');
    }
  };

  const sendFile = async (file) => {
    try {
      const newMessage = {
        id: Date.now(),
        text: `Datei gesendet: ${file.name}`,
        sender: 'Sie',
        senderId: 'current-user',
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size,
        isTeacher: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      toast.success('Datei erfolgreich gesendet');
    } catch (error) {
      toast.error('Fehler beim Senden der Datei');
    }
  };

  const value = {
    messages,
    onlineUsers,
    isConnected,
    sendMessage,
    sendFile
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
