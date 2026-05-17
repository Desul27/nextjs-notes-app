import { useState, useEffect } from "react";
export type Note = {
  id: number;
  title: string;
};

export function useNotes(userId?: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async (userId: string) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/notes?userId=${userId}`);
    const data = await res.json();
    setNotes(data);
  } catch (err) {
    setError("Failed to fetch notes");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  if (userId) {
    fetchNotes(userId);
  }
}, [userId]);

const addNote = async (
  title: string,
  userId: string
) => {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      userId,
    }),
  });
  const newNote = await res.json();
  setNotes((prev) => [...prev, newNote]);
};

const deleteNote = async (
  id: number,
  userId: string
) => {
  await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      userId,
    }),
  });

  setNotes((prev) =>
    prev.filter((note) => note.id !== id)
  );
};

const updateNote = async (
  id: number,
  title: string,
  userId: string
) => {
  await fetch("/api/notes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      userId,
    }),
  });

  setNotes((prev) =>
    prev.map((note) =>
      note.id === id
        ? { ...note, title }
        : note
    )
  );
};

return {
  notes,
  setNotes,
  loading,
  error,
  fetchNotes,
  addNote,
  deleteNote,
  updateNote,
};
}