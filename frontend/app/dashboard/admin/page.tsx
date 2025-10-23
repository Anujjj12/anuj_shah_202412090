"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const n = localStorage.getItem("user_name") || "";
    setName(n);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome {name}</p>
      </div>
    </>
  );
}
