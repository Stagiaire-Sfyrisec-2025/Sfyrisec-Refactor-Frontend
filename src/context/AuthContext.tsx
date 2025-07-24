import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  // Define your user type here, e.g., name, email, roles, etc.
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: { email: string; name?: string }) => void; // Accept user data on login
  logout: () => void;
  isLoading: boolean; // To handle initial auth state loading
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData: { email: string; name?: string }) => {
    const loggedInUser: User = {
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
    };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem('authUser', JSON.stringify(loggedInUser)); 
    setIsLoading(false); 
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser'); 
    setIsLoading(false); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
