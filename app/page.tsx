"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState} from "react";

import NoteItem from "./components/NoteItem"; // Import

type Note = {
  id: number;
  title: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  const fetchNotes = async () => {
     setLoading(true);  
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
      
    } catch (err) {
      setError("Gagal fetch notes");
    } finally {
      setLoading(false);
  
    }
  };

  fetchNotes();
}, []);  

useEffect(() => {
  const timer = setTimeout(() => {
    inputRef.current?.focus();
  }, 0);

  return () => clearTimeout(timer);
}, []);

  const handleAdd = async () => {
    if (!title) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const newNote = await res.json();
    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    inputRef.current?.focus();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setNotes((prev) => prev.filter((note) => note.id !== id));
    inputRef.current?.focus();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.title);
  };

  const handleSave = async (id: number) => {
    await fetch("/api/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title: editText }),
    });
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, title: editText } : note))
    );
    setEditingId(null);
    setEditText("");
    inputRef.current?.focus();
  };


  if (error) return <p>{error}</p>;
 

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {loading && <p>Loading...</p>}
        <h1 className={styles.title}>Notes App</h1>
        <div className={styles.inputGroup}>
          <input
            ref={inputRef}
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tulis note..."
            onKeyDown={(e) => {
            if (e.key === "Enter" && title.trim()) {
            handleAdd();
          }
        }}
          />
          <button className={styles.button} disabled={!title} onClick={handleAdd}>
            Tambah
          </button>
        </div>
        {notes.length === 0 ? (
          <p className={styles.empty}>Belum ada catatan</p>) : ( 
          <ul className={styles.list}>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
        )}
      </div>
    </div>
  );
}