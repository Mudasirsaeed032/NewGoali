import React, { useState } from 'react'

const SendInvite = () => {
  const [form, setForm] = useState({
    email: '',
    role: 'athlete',
  })
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [error, setError] = useState(null)

  const currentUserId = 'admin-user-id-here' // 🔁 Replace with dynamic user ID
  const currentTeamId = 'admin-team-id-here' // 🔁 Replace with current admin's team

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setInviteLink('')

    try {
      const res = await fetch('http://localhost:5000/api/invite/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          team_id: currentTeamId,
          sent_by: currentUserId
        })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Invite failed')

      setInviteLink(data.inviteLink)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Send Team Invite</h2>

      {error && <p className="text-red-600">{error}</p>}
      {inviteLink && (
        <div className="mb-4">
          <p className="text-green-600">Invite Link:</p>
          <input
            readOnly
            value={inviteLink}
            className="w-full border px-2 py-1 mt-1 rounded bg-gray-100 text-sm"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Invitee Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="coach">Coach</option>
          <option value="parent">Parent</option>
          <option value="athlete">Athlete</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Sending...' : 'Send Invite'}
        </button>
      </form>
    </div>
  )
}

export default SendInvite
