"use client";
import { IUserRegister } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext<any>({
  email: "",
  password: "",
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
    if (localUser.email) {
      saveUser(localUser);
    }
  }, []);

  const logout = () => {
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
