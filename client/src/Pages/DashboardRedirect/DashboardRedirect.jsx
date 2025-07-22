import { useParams } from 'react-router-dom'
import AdminDashboard from '../dashboard/Admin/AdminDashboard'
import CoachDashboard from '../dashboard/Coach/CoachDashboard'
import ParentDashboard from '../dashboard/ParentDashboard'
import AthleteDashboard from '../dashboard/AthleteDashboard'

const DashboardRedirect = () => {
  const { role } = useParams()

  switch (role) {
    case 'admin':
      return <AdminDashboard />
    case 'coach':
      return <CoachDashboard />
    case 'parent':
      return <ParentDashboard />
    case 'athlete':
      return <AthleteDashboard />
    default:
      return <div>Invalid role</div>
  }
}

export default DashboardRedirect
