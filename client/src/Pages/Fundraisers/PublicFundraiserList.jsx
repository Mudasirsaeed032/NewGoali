import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PublicFundraiserList = () => {
  const [fundraisers, setFundraisers] = useState([])

  useEffect(() => {
    const fetchFundraisers = async () => {
      const res = await fetch('http://localhost:5000/api/fundraisers/all')
      const data = await res.json()
      setFundraisers(data.fundraisers)
    }
    fetchFundraisers()
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Fundraisers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fundraisers.map((f) => (
          <div key={f.id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold">{f.title}</h2>
            <p>{f.description}</p>
            <p className="text-sm text-gray-300">Goal: ${f.goal_amount}</p>
            <p className="text-sm text-gray-400">Status: {f.status}</p>
            <Link
              to={`/fundraisers/${f.id}`}
              className="inline-block mt-2 text-blue-400 underline"
            >
              View / Donate
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicFundraiserList
