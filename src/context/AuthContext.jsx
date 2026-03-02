// src/context/AuthContext.jsx
// Provides user auth state to every component in the app.
// Wrap your App with <AuthProvider> so Header and pages can read the user.

import { createContext, useContext, useState, useCallback } from "react";
import { getCurrentUser } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser()); // load from localStorage on first render

  const signIn = useCallback((userData) => {
    setUser(userData);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this in any component: const { user, signIn, signOut } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
