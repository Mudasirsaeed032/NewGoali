import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import SignupOrganization from './Pages/Authentication/SignupOrganization'
import Login from './Pages/Authentication/Login'
import JoinTeam from './Pages/Authentication/JoinTeam'
import SendInvite from './Pages/Invites/SendInvite'
import DashboardRedirect from './Pages/DashboardRedirect/DashboardRedirect'
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute'
import Layout from './Boilerplate/Layout'
import CreateEvent from './Pages/Events/CreateEvent'
import CreateFundraiser from './Pages/Fundraisers/CreateFundraiser'
import FundraiserDetail from './Pages/Fundraisers/FundraiserDetail'
import EventDetail from './Pages/Events/EventDetail'
import MyTickets from './Pages/Events/MyTickets'
import AthleteManager from './Pages/Athletes/AthleteManager'
import PublicFundraiserList from './Pages/Fundraisers/PublicFundraiserList'
import PublicEventList from './Pages/Events/PublicEventList'
import PublicFundraiserEventList from './Pages/PublicFundraiserEventList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup/org" element={<SignupOrganization />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinTeam />} />

          <Route
            path="/admin/send-invite"
            element={
              <ProtectedRoute requiredRole="admin">
                <SendInvite />
              </ProtectedRoute>
            }
          />


          {/* Protected Role-Based Dashboard */}
          <Route
            path="/dashboard/:role"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route path='/fundraisers/create' element={
            <ProtectedRoute>
              <CreateFundraiser />
            </ProtectedRoute>
          } />

          <Route path="/fundraisers/:id" element={<FundraiserDetail />} />

          <Route path='/events/:id' element={<EventDetail />} />

          <Route path='/my-tickets' element={<MyTickets />} />

          <Route path='/dashboard/athletes' element={
            <ProtectedRoute>
              <AthleteManager />
            </ProtectedRoute>
          } />

          <Route path='/fundraisers' element={
            <PublicFundraiserList />
          }/>

          <Route path='/events' element={
            <PublicEventList />
          }/>

          <Route path='/explore' element={
            <PublicFundraiserEventList />
          } />

        </Routes>
      </Layout>
    </Router>
  )
}

export default App
