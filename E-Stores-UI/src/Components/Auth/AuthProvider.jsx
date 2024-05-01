import React, { createContext, useContext, useEffect, useState } from "react";
import useLoginRefresher from "./useLoginRefersher";

// context
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { user } = useLoginRefresher();

  const [auth, setAuth] = useState({
    userId: "",
    username: "",
    roles: ["CUSTOMER"],
    accessExpiration: null,
    refreshExpiration: null,
    authenticated: false,
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
