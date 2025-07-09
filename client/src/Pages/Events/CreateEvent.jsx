import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    goal_amount: ''
  })
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Not logged in')

    const res = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, created_by: user.id })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Event created successfully')
      navigate('/dashboard/' + user.role)
    } else {
      alert(data.error || 'Failed to create event')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-gray shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="date" name="date" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="number" name="price" placeholder="Ticket Price" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="number" name="goal_amount" placeholder="Fundraising Goal" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Event</button>
      </form>
    </div>
  )
}

export default CreateEvent
