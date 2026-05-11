"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  getUser();
}, []);


  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
   router.push("/");
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    router.push("/");
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Auth</h1>
{user && <p>Logged in as: {user.email}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={signUp}>Sign Up</button>

      <button onClick={signIn} style={{ marginLeft: "1rem" }}>
        Login
      </button>

      <button onClick={signOut} style={{ marginLeft: "1rem" }}>
        Logout
      </button>
    </main>
  );
}