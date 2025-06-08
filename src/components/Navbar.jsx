import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light')
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark')
    }
  }, [])

  const getGreeting = () => {
    const hour = time.getHours()
    if (hour < 12) return 'Good morning  -'
    if (hour < 18) return 'Good afternoon - '
    return 'Good evening - '
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">🎉 EventDash</div>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>Events</NavLink>
          <NavLink to="/add-event" className={({ isActive }) => isActive ? 'active' : ''}>Add Event</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
        </nav>

        <div className="navbar-right">
          <span className="greeting">{getGreeting()}</span>
          <span className="time">{time.toLocaleTimeString()}</span>
          <button className="toggle-theme" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            🌓
          </button>
        </div>
      </div>
    </header>
  )
}
