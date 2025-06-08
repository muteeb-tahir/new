import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('profileName') || 'John Doe';
    const savedEmail = localStorage.getItem('profileEmail') || 'john@example.com';
    setName(savedName);
    setEmail(savedEmail);
  }, []);

  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    setMessage('Profile saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="page">
      <h1>User Profile</h1>
      <form onSubmit={handleSave} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Save Changes</button>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
}
