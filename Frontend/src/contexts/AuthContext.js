// AuthContext.js
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  

  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
