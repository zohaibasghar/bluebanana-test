"use client";
import { IUser, IUserRegister } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AppContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  saveUser: (user: IUserRegister) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  user: { email: "", password: "" },
  setUser: () => {},
  saveUser: () => {},
  logout: () => {},
});

export default function AppContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({ email: "", password: "" });

  const saveUser = (user: IUserRegister) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") as string);
    if (localUser?.email && localUser?.password) {
      saveUser(localUser);
    }
  }, []);

  const logout = () => {
    toast.info("You are logged out!");
    localStorage.removeItem("user");
    setUser({ email: "", password: "" });
  };
  return (
    <AppContext.Provider value={{ user, setUser, saveUser, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
