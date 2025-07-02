import React from 'react';
import { useParams } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import CoachDashboard from './CoachDashboard';
import ParentDashboard from './ParentDashboard';
import PlayerDashboard from './PlayerDashboard';

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();

  const renderDashboard = () => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <AdminDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'athlete':
      case 'player':
        return <PlayerDashboard />;
      default:
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-title text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600 font-body">Role not found</p>
          </div>
        </div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;