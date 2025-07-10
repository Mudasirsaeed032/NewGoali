import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PublicEventList = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('http://localhost:5000/api/events/all')
      const data = await res.json()
      setEvents(data.events)
    }
    fetchEvents()
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((e) => (
          <div key={e.id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold">{e.title}</h2>
            <p>{e.description}</p>
            <p className="text-sm text-gray-300">Location: {e.location}</p>
            <p className="text-sm text-gray-300">Price: ${e.price}</p>
            <p className="text-sm text-gray-400">Date: {new Date(e.date).toLocaleDateString()}</p>
            <Link
              to={`/event/${e.id}`}
              className="inline-block mt-2 text-blue-400 underline"
            >
              View / Buy Ticket
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicEventList
