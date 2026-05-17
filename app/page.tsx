"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState} from "react";
import { supabase } from "@/lib/supabase";
import NoteItem from "./components/NoteItem"; // Import
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useNotes, type Note } from "./hooks/useNotes";


export default function Home() {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
const {
  notes,
  loading,
  error,
  addNote,
  deleteNote,
  updateNote,
} = useNotes(user?.id);


useEffect(() => {
  const timer = setTimeout(() => {
    inputRef.current?.focus();
  }, 0);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
       router.push("/auth");
      return;
      }
    setUser(user);
  }

  getUser();
}, []);


  const handleAdd = async () => {
  if (!title || !user?.id) return;
  await addNote(title, user.id);
  toast.success("Note added!");
  setTitle("");
  inputRef.current?.focus();
};

const handleDelete = async (id: number) => {
  if (!user?.id) return;
  await deleteNote(id, user.id);
  toast.success("Note deleted!");
  inputRef.current?.focus();
};
  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.title);
  };

const handleSave = async (id: number) => {
  if (!user?.id) return;
  await updateNote(
    id,
    editText,
    user.id
  );
  toast.success("Note updated!");
  setEditingId(null);
  setEditText("");
   inputRef.current?.focus();
};

if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        opacity: 0.7,
      }}
    >
      <p>Loading notes...</p>
    </div>
  );
}
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
        <div style={{ marginTop: "2rem", opacity: 0.7, textAlign: "center",}}>
          <h3>No notes yet ✨</h3>
       <p>
          Start by creating your first note.
        </p>
         </div>) : ( 
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