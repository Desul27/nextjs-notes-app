"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

useEffect(() => {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();//mengambil session awal saat component mount
    setUser(user);
  }
  getUser();
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => { //mendengarkan perubahan auth realtime
    setUser(session?.user ?? null); //sinkronkan dengan auth state tanpa refresh manual
  });
  return () => {
    subscription.unsubscribe();
  };
}, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/auth");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #333",
        marginBottom: "2rem",
      }}
    >
      <h2>Notes App</h2>

      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span>{user.email}</span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => router.push("/auth")}>
          Login
        </button>
      )}
    </nav>
  );
}