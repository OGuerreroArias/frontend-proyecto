import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// create a Auth Context
export const AuthContext = createContext<any>({} as any);

// create a Auth Provider
export const AuthProvider: any = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isVolunteer = (user: any) => {
    console.log(user)
    return user.lastName !== undefined;
  };
  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    if (user) {
      setUser(user);
    }
  }, [loading]);

  const value = { user, setUser, isVolunteer, signOut, loading, setLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
