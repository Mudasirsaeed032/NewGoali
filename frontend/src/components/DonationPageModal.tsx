import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Target, DollarSign, Users, Share2, Trophy, Calendar, 
  Plus, Trash2, Save, Eye, Settings, Image, Link, Copy,
  CheckCircle, Star, Award, TrendingUp, Heart
} from 'lucide-react';

interface DonationPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'admin' | 'coach';
  onDonationPageCreated: (donationPage: any) => void;
}

interface PlayerInvite {
  id: string;
  name: string;
  email: string;
  position: string;
  goal: number;
  avatar: string;
}

const DonationPageModal: React.FC<DonationPageModalProps> = ({ 
  isOpen, 
  onClose, 
  userRole,
  onDonationPageCreated 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [donationPageData, setDonationPageData] = useState({
    title: '',
    description: '',
    fundraisingGoal: 0,
    endDate: '',
    category: 'general',
    coverImage: '',
    teamName: 'Thunder Soccer Club',
    allowAnonymous: true,
    showLeaderboard: true,
    enableSharing: true,
    customMessage: '',
    tags: [] as string[],
  });

  const [playerInvites, setPlayerInvites] = useState<PlayerInvite[]>([
    { id: '1', name: 'Sarah Martinez', email: 'sarah@email.com', position: 'Forward', goal: 1500, avatar: 'SM' },
    { id: '2', name: 'Alex Rivera', email: 'alex@email.com', position: 'Midfielder', goal: 1200, avatar: 'AR' },
    { id: '3', name: 'Jordan Smith', email: 'jordan@email.com', position: 'Defender', goal: 1000, avatar: 'JS' },
    { id: '4', name: 'Casey Brown', email: 'casey@email.com', position: 'Goalkeeper', goal: 800, avatar: 'CB' },
    { id: '5', name: 'Taylor Davis', email: 'taylor@email.com', position: 'Forward', goal: 1100, avatar: 'TD' }
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const donationCategories = [
    { value: 'general', label: 'General Fundraising', icon: Target },
    { value: 'equipment', label: 'Equipment & Gear', icon: Trophy },
    { value: 'travel', label: 'Travel & Tournaments', icon: Calendar },
    { value: 'facilities', label: 'Facilities & Training', icon: Settings },
    { value: 'scholarships', label: 'Player Scholarships', icon: Star }
  ];

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const updatePlayerGoal = (playerId: string, goal: number) => {
    setPlayerInvites(prev => prev.map(player => 
      player.id === playerId ? { ...player, goal } : player
    ));
  };

  const addTag = () => {
    if (newTag.trim() && !donationPageData.tags.includes(newTag.trim())) {
      setDonationPageData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setDonationPageData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDonationPage = {
      id: Date.now().toString(),
      ...donationPageData,
      selectedPlayers: selectedPlayers.map(id => 
        playerInvites.find(p => p.id === id)
      ).filter(Boolean),
      createdBy: userRole,
      createdAt: new Date().toISOString(),
      status: userRole === 'admin' ? 'published' : 'pending_approval',
      totalRaised: 0,
      donorCount: 0,
      shareCount: 0,
      leaderboard: selectedPlayers.map(id => {
        const player = playerInvites.find(p => p.id === id);
        return {
          playerId: id,
          playerName: player?.name || '',
          playerAvatar: player?.avatar || '',
          raised: 0,
          goal: player?.goal || 0,
          donorCount: 0,
          shareCount: 0
        };
      })
    };

    onDonationPageCreated(newDonationPage);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setDonationPageData({
      title: '',
      description: '',
      fundraisingGoal: 0,
      endDate: '',
      category: 'general',
      coverImage: '',
      teamName: 'Thunder Soccer Club',
      allowAnonymous: true,
      showLeaderboard: true,
      enableSharing: true,
      customMessage: '',
      tags: [],
    });
    setSelectedPlayers([]);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStep1Valid = donationPageData.title && donationPageData.fundraisingGoal > 0 && donationPageData.endDate;
  const isStep2Valid = donationPageData.description && donationPageData.category;
  const isFormValid = isStep1Valid && isStep2Valid && selectedPlayers.length > 0;

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
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-title text-gray-900">Create Donation Page</h2>
              <p className="text-gray-600 font-body">
                {userRole === 'admin' ? 'Create and publish donation pages instantly' : 'Create donation pages for admin approval'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: 'Campaign Details' },
                { step: 2, label: 'Description & Settings' },
                { step: 3, label: 'Player Invites & Goals' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-header transition-all duration-300 ${
                    currentStep >= item.step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.step}
                  </div>
                  <span className={`ml-2 text-sm font-body ${
                    currentStep >= item.step ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {/* Step 1: Campaign Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Campaign Title *
                      </label>
                      <input
                        type="text"
                        value={donationPageData.title}
                        onChange={(e) => setDonationPageData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        placeholder="e.g., Help Thunder Soccer Club Reach State Championships"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Fundraising Goal ($) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={donationPageData.fundraisingGoal}
                          onChange={(e) => setDonationPageData(prev => ({ ...prev, fundraisingGoal: parseInt(e.target.value) || 0 }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                          placeholder="10000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Campaign End Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={donationPageData.endDate}
                          onChange={(e) => setDonationPageData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Team Name
                      </label>
                      <input
                        type="text"
                        value={donationPageData.teamName}
                        onChange={(e) => setDonationPageData(prev => ({ ...prev, teamName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        placeholder="Thunder Soccer Club"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Description & Settings */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Campaign Description *
                    </label>
                    <textarea
                      value={donationPageData.description}
                      onChange={(e) => setDonationPageData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                      placeholder="Tell supporters about your fundraising goals, what the money will be used for, and why their support matters..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Campaign Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {donationCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <motion.button
                            key={category.value}
                            type="button"
                            onClick={() => setDonationPageData(prev => ({ ...prev, category: category.value }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              donationPageData.category === category.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                              donationPageData.category === category.value ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                            <span className={`text-sm font-body ${
                              donationPageData.category === category.value ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {category.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Custom Thank You Message
                    </label>
                    <textarea
                      value={donationPageData.customMessage}
                      onChange={(e) => setDonationPageData(prev => ({ ...prev, customMessage: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                      placeholder="Thank you message that will be shown to donors after they contribute..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {donationPageData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-body flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-blue-200 rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        placeholder="Add a tag..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={donationPageData.allowAnonymous}
                        onChange={(e) => setDonationPageData(prev => ({ ...prev, allowAnonymous: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-header text-gray-900">Allow Anonymous</span>
                        <p className="text-sm text-gray-600 font-body">Let donors contribute anonymously</p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={donationPageData.showLeaderboard}
                        onChange={(e) => setDonationPageData(prev => ({ ...prev, showLeaderboard: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-header text-gray-900">Show Leaderboard</span>
                        <p className="text-sm text-gray-600 font-body">Display player fundraising rankings</p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={donationPageData.enableSharing}
                        onChange={(e) => setDonationPageData(prev => ({ ...prev, enableSharing: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-header text-gray-900">Enable Sharing</span>
                        <p className="text-sm text-gray-600 font-body">Allow players to share their links</p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Player Invites & Goals */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-header text-gray-900 mb-4">Invite Players to Participate</h3>
                    <p className="text-gray-600 font-body mb-6">
                      Select players to participate in this fundraising campaign and set individual goals.
                    </p>

                    <div className="space-y-4">
                      {playerInvites.map((player) => (
                        <motion.div
                          key={player.id}
                          className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                            selectedPlayers.includes(player.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedPlayers.includes(player.id)}
                                onChange={() => handlePlayerToggle(player.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-header text-sm">{player.avatar}</span>
                              </div>
                              <div>
                                <h4 className="font-header text-gray-900">{player.name}</h4>
                                <p className="text-sm text-gray-600 font-body">{player.position} • {player.email}</p>
                              </div>
                            </div>

                            {selectedPlayers.includes(player.id) && (
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <label className="block text-sm font-header text-gray-700 mb-1">
                                    Individual Goal ($)
                                  </label>
                                  <input
                                    type="number"
                                    value={player.goal}
                                    onChange={(e) => updatePlayerGoal(player.id, parseInt(e.target.value) || 0)}
                                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body text-center"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {selectedPlayers.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <h4 className="font-header text-green-900 mb-2">Selected Players Summary</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-title text-green-900">{selectedPlayers.length}</div>
                            <div className="text-sm text-green-700 font-body">Players</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-title text-green-900">
                              ${selectedPlayers.reduce((sum, id) => {
                                const player = playerInvites.find(p => p.id === id);
                                return sum + (player?.goal || 0);
                              }, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-green-700 font-body">Combined Goals</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-title text-green-900">
                              ${Math.round((selectedPlayers.reduce((sum, id) => {
                                const player = playerInvites.find(p => p.id === id);
                                return sum + (player?.goal || 0);
                              }, 0)) / selectedPlayers.length).toLocaleString()}
                            </div>
                            <div className="text-sm text-green-700 font-body">Avg. Goal</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-title text-green-900">
                              {Math.round((selectedPlayers.reduce((sum, id) => {
                                const player = playerInvites.find(p => p.id === id);
                                return sum + (player?.goal || 0);
                              }, 0) / donationPageData.fundraisingGoal) * 100)}%
                            </div>
                            <div className="text-sm text-green-700 font-body">of Campaign Goal</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg font-header hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-body"
              >
                Cancel
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !isStep1Valid) ||
                    (currentStep === 2 && !isStep2Valid)
                  }
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-header transition-colors"
                >
                  Continue
                </button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-header transition-all duration-200 flex items-center space-x-2"
                  whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Creating Campaign...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Create Donation Page</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DonationPageModal;