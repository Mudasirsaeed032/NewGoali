import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Copy, Users, Shield, Trophy, Heart, 
  CheckCircle, Clock, AlertCircle, Mail, Link,
  UserPlus, Settings, Eye, MoreHorizontal, Trash2
} from 'lucide-react';

interface InviteManagementProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'admin' | 'coach';
}

interface Invitation {
  id: string;
  email: string;
  role: 'coach' | 'parent' | 'player';
  status: 'pending' | 'accepted' | 'expired';
  sentAt: string;
  sentBy: string;
  inviteLink: string;
  expiresAt: string;
}

const InviteManagement: React.FC<InviteManagementProps> = ({ isOpen, onClose, userRole }) => {
  const [activeTab, setActiveTab] = useState<'send' | 'manage'>('send');
  const [inviteData, setInviteData] = useState({
    emails: '',
    role: 'player' as 'coach' | 'parent' | 'player',
    message: '',
    expiresIn: '7' // days
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Sample existing invitations
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      email: 'coach.smith@email.com',
      role: 'coach',
      status: 'pending',
      sentAt: '2024-02-01T10:00:00Z',
      sentBy: 'Admin',
      inviteLink: 'https://goali.app/signup?invite=abc123&role=coach',
      expiresAt: '2024-02-08T10:00:00Z'
    },
    {
      id: '2',
      email: 'parent.johnson@email.com',
      role: 'parent',
      status: 'accepted',
      sentAt: '2024-01-28T14:30:00Z',
      sentBy: 'Admin',
      inviteLink: 'https://goali.app/signup?invite=def456&role=parent',
      expiresAt: '2024-02-04T14:30:00Z'
    },
    {
      id: '3',
      email: 'player.davis@email.com',
      role: 'player',
      status: 'pending',
      sentAt: '2024-02-02T09:15:00Z',
      sentBy: 'Coach Martinez',
      inviteLink: 'https://goali.app/signup?invite=ghi789&role=player',
      expiresAt: '2024-02-09T09:15:00Z'
    }
  ]);

  const roles = [
    {
      value: 'coach',
      label: 'Coach',
      icon: Trophy,
      description: 'Can manage team, create events, and invite others',
      color: 'blue',
      adminOnly: true
    },
    {
      value: 'parent',
      label: 'Parent',
      icon: Heart,
      description: 'Can make payments, view progress, and support fundraising',
      color: 'pink',
      adminOnly: false
    },
    {
      value: 'player',
      label: 'Player/Athlete',
      icon: Users,
      description: 'Can participate in fundraising and track personal progress',
      color: 'purple',
      adminOnly: false
    }
  ];

  const availableRoles = userRole === 'admin' 
    ? roles 
    : roles.filter(role => !role.adminOnly);

  const handleSendInvites = async () => {
    setIsSubmitting(true);
    
    // Simulate sending invites
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Parse emails and create invitations
    const emailList = inviteData.emails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    const newInvitations = emailList.map(email => ({
      id: Date.now().toString() + Math.random(),
      email,
      role: inviteData.role,
      status: 'pending' as const,
      sentAt: new Date().toISOString(),
      sentBy: userRole === 'admin' ? 'Admin' : 'Coach',
      inviteLink: `https://goali.app/signup?invite=${Math.random().toString(36).substr(2, 9)}&role=${inviteData.role}`,
      expiresAt: new Date(Date.now() + parseInt(inviteData.expiresIn) * 24 * 60 * 60 * 1000).toISOString()
    }));

    setInvitations(prev => [...newInvitations, ...prev]);
    
    // Reset form
    setInviteData({
      emails: '',
      role: 'player',
      message: '',
      expiresIn: '7'
    });
    
    setIsSubmitting(false);
    setActiveTab('manage');
  };

  const copyInviteLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const resendInvite = (inviteId: string) => {
    setInvitations(prev => prev.map(invite => 
      invite.id === inviteId 
        ? { ...invite, sentAt: new Date().toISOString(), status: 'pending' as const }
        : invite
    ));
  };

  const deleteInvite = (inviteId: string) => {
    setInvitations(prev => prev.filter(invite => invite.id !== inviteId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'accepted': return 'green';
      case 'expired': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'accepted': return CheckCircle;
      case 'expired': return AlertCircle;
      default: return Clock;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-title text-gray-900">Team Invitations</h2>
              <p className="text-gray-600 font-body">
                Invite new members to join your team and manage existing invitations
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('send')}
              className={`flex-1 px-6 py-4 text-center font-header transition-colors ${
                activeTab === 'send'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Invites</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 px-6 py-4 text-center font-header transition-colors ${
                activeTab === 'manage'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Manage Invites ({invitations.filter(i => i.status === 'pending').length})</span>
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {/* Send Invites Tab */}
              {activeTab === 'send' && (
                <motion.div
                  key="send"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-3">
                      Select Role *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {availableRoles.map((role) => {
                        const IconComponent = role.icon;
                        return (
                          <motion.button
                            key={role.value}
                            type="button"
                            onClick={() => setInviteData(prev => ({ ...prev, role: role.value as any }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              inviteData.role === role.value
                                ? `border-${role.color}-500 bg-${role.color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <IconComponent className={`h-5 w-5 ${
                                inviteData.role === role.value ? `text-${role.color}-600` : 'text-gray-600'
                              }`} />
                              <span className={`font-header ${
                                inviteData.role === role.value ? `text-${role.color}-900` : 'text-gray-900'
                              }`}>
                                {role.label}
                              </span>
                            </div>
                            <p className={`text-sm font-body ${
                              inviteData.role === role.value ? `text-${role.color}-700` : 'text-gray-600'
                            }`}>
                              {role.description}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Addresses */}
                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Email Addresses *
                    </label>
                    <textarea
                      value={inviteData.emails}
                      onChange={(e) => setInviteData(prev => ({ ...prev, emails: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                      placeholder="Enter email addresses (one per line)&#10;example1@email.com&#10;example2@email.com&#10;example3@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1 font-body">
                      Enter one email address per line. You can invite multiple people at once.
                    </p>
                  </div>

                  {/* Expiration */}
                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Invitation Expires In
                    </label>
                    <select
                      value={inviteData.expiresIn}
                      onChange={(e) => setInviteData(prev => ({ ...prev, expiresIn: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                    >
                      <option value="1">1 day</option>
                      <option value="3">3 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>

                  {/* Custom Message */}
                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Custom Message (Optional)
                    </label>
                    <textarea
                      value={inviteData.message}
                      onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                      placeholder="Add a personal message to your invitation..."
                    />
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={handleSendInvites}
                    disabled={!inviteData.emails.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-header text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    whileHover={inviteData.emails.trim() && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={inviteData.emails.trim() && !isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending Invitations...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Invitations</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Manage Invites Tab */}
              {activeTab === 'manage' && (
                <motion.div
                  key="manage"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-6 w-6 text-orange-600" />
                        <div>
                          <div className="text-2xl font-header text-orange-900">
                            {invitations.filter(i => i.status === 'pending').length}
                          </div>
                          <div className="text-sm text-orange-700 font-body">Pending</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="text-2xl font-header text-green-900">
                            {invitations.filter(i => i.status === 'accepted').length}
                          </div>
                          <div className="text-sm text-green-700 font-body">Accepted</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <div>
                          <div className="text-2xl font-header text-red-900">
                            {invitations.filter(i => i.status === 'expired').length}
                          </div>
                          <div className="text-sm text-red-700 font-body">Expired</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invitations List */}
                  <div className="space-y-4">
                    {invitations.map((invitation) => {
                      const StatusIcon = getStatusIcon(invitation.status);
                      const statusColor = getStatusColor(invitation.status);
                      const roleData = roles.find(r => r.value === invitation.role);

                      return (
                        <div key={invitation.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 bg-${roleData?.color}-100 rounded-lg flex items-center justify-center`}>
                                {roleData && <roleData.icon className={`h-5 w-5 text-${roleData.color}-600`} />}
                              </div>
                              <div>
                                <h4 className="font-header text-gray-900">{invitation.email}</h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                                  <span className="capitalize">{invitation.role}</span>
                                  <span>•</span>
                                  <span>Sent by {invitation.sentBy}</span>
                                  <span>•</span>
                                  <span>{new Date(invitation.sentAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-header bg-${statusColor}-100 text-${statusColor}-800`}>
                                <StatusIcon className="h-3 w-3" />
                                <span className="capitalize">{invitation.status}</span>
                              </span>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => copyInviteLink(invitation.inviteLink, invitation.id)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    copiedLink === invitation.id
                                      ? 'bg-green-100 text-green-600'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                  title="Copy invite link"
                                >
                                  {copiedLink === invitation.id ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>

                                {invitation.status === 'pending' && (
                                  <button
                                    onClick={() => resendInvite(invitation.id)}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    title="Resend invitation"
                                  >
                                    <Send className="h-4 w-4" />
                                  </button>
                                )}

                                <button
                                  onClick={() => deleteInvite(invitation.id)}
                                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                  title="Delete invitation"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {invitation.status === 'pending' && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center justify-between text-sm text-gray-600 font-body">
                                <span>Expires: {new Date(invitation.expiresAt).toLocaleDateString()}</span>
                                <button
                                  onClick={() => copyInviteLink(invitation.inviteLink, invitation.id)}
                                  className="text-blue-600 hover:text-blue-700 font-header"
                                >
                                  {copiedLink === invitation.id ? 'Copied!' : 'Copy Link'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {invitations.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-body">No invitations sent yet. Start by sending your first invite!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InviteManagement;