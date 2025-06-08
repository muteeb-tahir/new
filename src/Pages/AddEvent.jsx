import React, { useState } from 'react';

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!title.trim() || !date || !time) {
      setError('Please fill in all required fields (Title, Date, Time).');
      return;
    }
    setError('');

    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      description,
    };

    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    storedEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(storedEvents));

    setSuccessMsg('Event added successfully!');
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="page add-event-page">
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit} className="add-event-form" noValidate>
        <div className="form-group">
          <label htmlFor="title">Title <span className="required">*</span></label>
          <input
            id="title"
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date <span className="required">*</span></label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time <span className="required">*</span></label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add event details (optional)"
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <div className="btn-group">
          <button type="submit" className="submit-btn">Add Event</button>
          <button type="button" className="clear-btn" onClick={handleReset}>Clear</button>
        </div>
      </form>

      {(title || date || time || description) && (
        <section className="preview-section">
          <h2>Preview</h2>
          <p><strong>Title:</strong> {title || '-'}</p>
          <p><strong>Date:</strong> {date || '-'}</p>
          <p><strong>Time:</strong> {time || '-'}</p>
          {description && <p><strong>Description:</strong> {description}</p>}
        </section>
      )}
    </div>
  );
}
