import React, { createContext, useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    apiHandler.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
    });
  }, []);

  return (
    <div>
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
          {children}
        </AuthContext.Provider>
    </div>
  );
};
