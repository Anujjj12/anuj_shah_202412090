"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(localStorage.getItem("user_name") || "");
  }, []);
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h1>Customer Dashboard</h1>
        <p>Welcome, {name}</p>
      </div>
    </>
  );
}
