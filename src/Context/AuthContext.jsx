import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>
    localStorage.getItem("user")
  );
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token"),
  );
  // Load from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save auth
  const saveAuth = (access_token, userData) => {
    setToken(access_token);
    setUser(userData);

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear auth
  const clearAuth = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        saveAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
