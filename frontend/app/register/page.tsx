"use client";
import { useState } from "react";
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [msg, setMsg] = useState("");
  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
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
      <h2>Create account</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <div style={{ color: "red" }}>{msg}</div>
      </form>
    </div>
  );
}
