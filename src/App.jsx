import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Events from './Pages/Events';
import AddEvent from './Pages/AddEvent';
import Profile from './Pages/Profile';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
