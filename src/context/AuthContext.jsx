import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth muss innerhalb eines AuthProvider verwendet werden');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuliere das Laden des Benutzers aus localStorage
    const savedUser = localStorage.getItem('kursapp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo-Benutzer
      const demoUsers = [
        { id: 1, email: 'schueler@example.com', password: '123456', name: 'Max Mustermann', role: 'student' },
        { id: 2, email: 'lehrer@example.com', password: '123456', name: 'Dr. Anna Schmidt', role: 'teacher' }
      ];
      
      const foundUser = demoUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        };
        
        setUser(userData);
        localStorage.setItem('kursapp_user', JSON.stringify(userData));
        toast.success(`Willkommen zurück, ${userData.name}!`);
        return { success: true };
      } else {
        toast.error('Ungültige Anmeldedaten');
        return { success: false, error: 'Ungültige Anmeldedaten' };
      }
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten');
      return { success: false, error: 'Ein Fehler ist aufgetreten' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'student') => {
    try {
      setLoading(true);
      
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prüfe ob E-Mail bereits existiert
      const existingUser = localStorage.getItem('kursapp_user');
      if (existingUser && JSON.parse(existingUser).email === email) {
        toast.error('Diese E-Mail ist bereits registriert');
        return { success: false, error: 'E-Mail bereits registriert' };
      }
      
      const userData = {
        id: Date.now(),
        email,
        name,
        role
      };
      
      setUser(userData);
      localStorage.setItem('kursapp_user', JSON.stringify(userData));
      toast.success(`Registrierung erfolgreich! Willkommen, ${name}!`);
      return { success: true };
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten');
      return { success: false, error: 'Ein Fehler ist aufgetreten' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kursapp_user');
    toast.success('Erfolgreich abgemeldet');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
