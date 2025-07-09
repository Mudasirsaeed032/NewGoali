import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

const FundraiserDetail = () => {
  const { id } = useParams()
  const [fundraiser, setFundraiser] = useState(null)
  const [amount, setAmount] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchFundraiser = async () => {
      const { data, error } = await supabase
        .from('fundraisers')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) setFundraiser(data)
    }

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchFundraiser()
    fetchUser()
  }, [id])

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || amount <= 0) return alert('Enter a valid donation amount')

    const res = await fetch('http://localhost:5000/api/checkout/fundraiser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(amount),
        fundraiser_id: id,
        user_id: user?.id || null,
        email: user?.email || null
      })
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Failed to create Stripe session')
    }
  }

  if (!fundraiser) return <div className="p-6">Loading fundraiser...</div>

  const percent = Math.min((fundraiser.collected_amount / fundraiser.goal_amount) * 100, 100).toFixed(0)

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-gray shadow rounded">
      <h1 className="text-2xl font-bold mb-2">{fundraiser.title}</h1>
      <p className="mb-4 text-gray-700">{fundraiser.description}</p>

      <div className="mb-4">
        <p><strong>Goal:</strong> ${fundraiser.goal_amount}</p>
        <p><strong>Raised:</strong> ${fundraiser.collected_amount}</p>
        <div className="w-full bg-gray-200 h-3 rounded mt-2">
          <div className="bg-green-500 h-3 rounded" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="text-sm mt-1 text-gray-600">{percent}% funded</p>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Enter amount ($)"
          className="border px-3 py-2 w-full rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleDonate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Donate with Stripe
        </button>
      </div>
    </div>
  )
}

export default FundraiserDetail
