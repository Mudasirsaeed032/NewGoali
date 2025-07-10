import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">GOALI</Link>

      <div className="space-x-4">
        {/* Always visible */}
        <Link to="/fundraisers/sample-id" className="hover:underline">Fundraiser</Link>
        <Link to="/events/sample-id" className="hover:underline">Event</Link>

        {user && (
          <Link to="/my-tickets" className="hover:underline">My Tickets</Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/signup/org" className="hover:underline">Start Org</Link>
            <Link to="/join" className="hover:underline">Join Team</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
