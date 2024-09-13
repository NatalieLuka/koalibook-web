"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const ActiveBookContext = createContext();

export function BookProvider({ children }) {
  const { user } = useAuth();
  const [activeBook, setActiveBook] = useState(null);

  useEffect(() => {
    const handleStorage = async () => {
      try {
        if (user?.id) {
          const storageKey = `active_book_${user.id}`;

          const storedBook = localStorage.getItem(storageKey);
          if (storedBook) {
            setActiveBook(JSON.parse(storedBook));
          }

          if (activeBook !== null) {
            localStorage.setItem(storageKey, JSON.stringify(activeBook));
          } else {
            localStorage.removeItem(storageKey);
          }
        }
      } catch (e) {
        console.error("Error handling active book storage", e);
      }
    };

    handleStorage();
  }, [user?.id, activeBook]);

  return (
    <ActiveBookContext.Provider
      value={{
        activeBook,
        setActiveBook,
      }}
    >
      {children}
    </ActiveBookContext.Provider>
  );
}

export function useActiveBook() {
  return useContext(ActiveBookContext);
}
