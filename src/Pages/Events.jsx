import React, { useEffect, useState } from 'react'

export default function Events() {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('events')
    return stored ? JSON.parse(stored) : [
      { id: 1, title: 'Hackathon 2025', date: '2025-07-15' },
      { id: 2, title: 'Product Launch', date: '2025-08-01' }
    ]
  })
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const filteredEvents = events
    .filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search))
    .sort((a, b) => sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date))

  const startEdit = event => {
    setEditingId(event.id)
    setEditTitle(event.title)
    setEditDate(event.date)
  }

  const saveEdit = id => {
    if (!editTitle.trim() || !editDate) {
      alert('Please fill in both title and date')
      return
    }
    setEvents(events.map(e => e.id === id ? { ...e, title: editTitle, date: editDate } : e))
    setEditingId(null)
  }

  const cancelEdit = () => setEditingId(null)

  const deleteEvent = id => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  return (
    <div className="page">
      <h1>Upcoming Events</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title or date..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '0.5rem', width: '250px', marginRight: '1rem' }}
        />
        <button onClick={() => setSortAsc(!sortAsc)} style={{ padding: '0.5rem' }}>
          Sort by Date {sortAsc ? '▲' : '▼'}
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredEvents.map(event => (
            <li
              key={event.id}
              style={{
                background: 'var(--nav-bg)',
                padding: '1rem',
                marginBottom: '0.75rem',
                borderRadius: '6px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {editingId === event.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ marginRight: '1rem', flex: 1 }}
                  />
                  <input
                    type="date"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                    style={{ marginRight: '1rem' }}
                  />
                  <button onClick={() => saveEdit(event.id)} style={{ marginRight: '0.5rem' }}>
                    Save
                  </button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <div>
                    <strong>{event.title}</strong> – {event.date}
                  </div>
                  <div>
                    <button onClick={() => startEdit(event)} style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button onClick={() => deleteEvent(event.id)} style={{ color: 'red' }}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
