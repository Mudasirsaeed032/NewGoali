import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const CoachFundraiserDonations = () => {
  const [fundraisers, setFundraisers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const res = await fetch(`http://localhost:5000/api/coach/fundraiser-donations?user_id=${user.id}`)
      const result = await res.json()
      setFundraisers(result.fundraisers || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-6">Loading donations...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6">Your Fundraisers & Donations</h2>
      {fundraisers.length === 0 && (
        <p>No fundraisers found.</p>
      )}
      {fundraisers.map(({ fundraiser, donations, totalRaised }) => (
        <div key={fundraiser.id} className="mb-8 border border-gray-700 rounded-lg p-4 bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">{fundraiser.title}</h3>
          <p>Goal: ${fundraiser.goal_amount}</p>
          <p>Raised: ${totalRaised}</p>
          <div className="w-full bg-gray-600 rounded h-3 my-3">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${Math.min((totalRaised / fundraiser.goal_amount) * 100, 100)}%` }}
            />
          </div>

          <h4 className="text-lg font-bold mt-4 mb-2">Donations:</h4>
          {donations.length === 0 ? (
            <p>No donations yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="p-2 text-left">Donor</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-t border-gray-600">
                    <td className="p-2">{d.user_id.slice(0, 6)}...</td>
                    <td className="p-2">${d.amount}</td>
                    <td className="p-2">{new Date(d.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  )
}

export default CoachFundraiserDonations
