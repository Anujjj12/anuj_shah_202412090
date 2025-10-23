'use client'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'

export default function Page() {
  const [name, setName] = useState('')

  useEffect(() => {
    const n = localStorage.getItem('user_name') || ''
    setName(n)
  }, [])

  return (
    <Navbar />
  )
}
