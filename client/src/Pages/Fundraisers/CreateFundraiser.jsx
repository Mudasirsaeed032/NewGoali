import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

const CreateFundraiser = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal_amount: ''
  })
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('User not found')

    const res = await fetch('http://localhost:5000/api/fundraisers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, owner_id: user.id })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Fundraiser created successfully')
      navigate(`/dashboard/${user.role}`)
    } else {
      alert(data.error || 'Failed to create fundraiser')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-gray shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Fundraiser</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="goal_amount"
          placeholder="Fundraising Goal ($)"
          value={form.goal_amount}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Fundraiser
        </button>
      </form>
    </div>
  )
}

export default CreateFundraiser
