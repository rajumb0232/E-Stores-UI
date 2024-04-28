import React, { createContext, useContext, useEffect, useState } from "react";
import useLoginRefresh from "../Auth/useLoginRefersher";

// context
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { user } = useLoginRefresh();
  const [auth, setAuth] = useState({
    userId: "",
    username: "",
    role: "CUSTOMER",
    isAuthenticated: false,
    fromLocation: "",
    accessExpiry: "",
  });

  useEffect(() => {
    if (user?.userId) setAuth(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
