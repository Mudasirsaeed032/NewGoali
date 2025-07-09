import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

const ProtectedRoute = ({ children }) => {
  const { role } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        navigate('/login')
        return
      }

      if (data.role !== role) {
        navigate(`/dashboard/${data.role}`)
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [navigate, role])

  if (loading) {
    return <div className="p-4 text-center">Checking permissions...</div>
  }

  return children
}

export default ProtectedRoute
