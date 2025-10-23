'use client'
import { useEffect, useState } from 'react'
export default function Navbar(){
  const [name,setName] = useState('')
  useEffect(()=>{
    const n = localStorage.getItem('user_name') || ''
    setName(n)
  },[])
  const logout = async ()=>{
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/logout', { method: 'POST'})
    localStorage.removeItem('user_name')
    setName('')
    window.location.href = '/'
  }
  return (
    <nav style={{display:'flex',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #ddd'}}>
      <div style={{fontWeight:700}}>MyApp</div>
      <div>
        {name ? (
          <span style={{display:'flex',alignItems:'center',gap:12}}>
            <span>Hi, {name}</span>
            <button onClick={logout} style={{padding:'6px 10px',cursor:'pointer'}}>Logout</button>
          </span>
        ) : (
          <span style={{display:'flex',gap:12}}>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </span>
        )}
      </div>
    </nav>
  )
}
