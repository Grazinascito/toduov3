"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProps } from "../types";

interface UserContextProps {
  currentUser: UserProps | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// User Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null); // or fetch from local storage/session

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};