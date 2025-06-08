import React, { useState, useEffect } from 'react';

export default function Home() {
  const [dateTime, setDateTime] = useState(new Date());

  const events = [
    { id: 1, title: 'Hackathon 2025', date: '2025-07-15', time: '10:00' },
    { id: 2, title: 'Product Launch', date: '2025-08-01', time: '14:00' },
    { id: 3, title: 'Team Meeting', date: '2025-06-10', time: '11:00' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => new Date(`${event.date}T${event.time}`) > now);
  };

  const getSoonEvents = () => {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    return events.filter(event => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      return eventDate > now && eventDate < nextWeek;
    });
  };

  const upcomingEvents = getUpcomingEvents();
  const soonEvents = getSoonEvents();

  return (
    <div className="page">
      <h1>Welcome to Your Event Dashboard</h1>
      <p>
        Current Time: <strong>{dateTime.toLocaleTimeString()}</strong><br />
        Today is: <strong>{dateTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
      </p>

      {}
      <div className="card">
        <h2>📅 Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id}>
                <strong>{event.title}</strong> – {event.date} at {event.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {}
      <div className="card">
        <h2>📊 Event Stats</h2>
        <ul>
          <li>Total Events: {events.length}</li>
          <li>Upcoming: {upcomingEvents.length}</li>
          <li>Past: {events.length - upcomingEvents.length}</li>
        </ul>
      </div>

      {}
      <div className="card">
        <h2>🔔 Notifications</h2>
        {soonEvents.length > 0 ? (
          <ul>
            {soonEvents.map(event => (
              <li key={event.id}>
                ⏰ <strong>{event.title}</strong> is coming up on {event.date} at {event.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>You're all set! No events within the next 7 days.</p>
        )}
      </div>

      {}
      <div className="card">
        <h2>🧠 Suggested Time Slot</h2>
        <p>
          You seem to be free on <strong>Friday afternoon</strong>. Maybe a good time to plan your next event?
        </p>
      </div>
    </div>
  );
}
