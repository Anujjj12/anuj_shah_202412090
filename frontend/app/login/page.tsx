"use client";
import { useState } from "react";
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user_name", data.name);
      localStorage.setItem("user_role", data.role);
      if (data.role === "admin") {
        window.location.href = "/dashboard/admin";
      } else {
        window.location.href = "/dashboard/customer";
      }
    } else {
      setMsg(data.message || "Error");
    }
  };
  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div style={{ color: "red" }}>{msg}</div>
      </form>
    </div>
  );
}
