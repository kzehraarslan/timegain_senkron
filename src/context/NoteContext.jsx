// src/context/NoteContext.jsx
import { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [starredNotes, setStarredNotes] = useState(() => {
    const saved = localStorage.getItem("starredNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const addStarredNote = (note) => {
    setStarredNotes((prev) => {
      const updated = [...prev, note];
      localStorage.setItem("starredNotes", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <NoteContext.Provider value={{ starredNotes, addStarredNote }}>
      {children}
    </NoteContext.Provider>
  );
};
