import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, MapPin, Clock, DollarSign, Users, Ticket, 
  Image, Plus, Trash2, Save, Eye, Settings, Target
} from 'lucide-react';

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'admin' | 'coach';
  onEventCreated: (event: any) => void;
}

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  perks: string[];
}

const EventCreationModal: React.FC<EventCreationModalProps> = ({ 
  isOpen, 
  onClose, 
  userRole,
  onEventCreated 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'fundraiser',
    fundraisingGoal: 0,
    maxAttendees: 0,
    isPublic: true,
    requiresApproval: false,
    coverImage: '',
    tags: [] as string[],
  });

  const [ticketSales, setTicketSales] = useState({
    enabled: false,
    tiers: [] as TicketTier[]
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventCategories = [
    { value: 'fundraiser', label: 'Fundraising Event', icon: Target },
    { value: 'tournament', label: 'Tournament', icon: Users },
    { value: 'social', label: 'Social Event', icon: Calendar },
    { value: 'training', label: 'Training Camp', icon: Clock },
    { value: 'meeting', label: 'Team Meeting', icon: Settings }
  ];

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 100,
      description: '',
      perks: []
    };
    setTicketSales(prev => ({
      ...prev,
      tiers: [...prev.tiers, newTier]
    }));
  };

  const updateTicketTier = (id: string, updates: Partial<TicketTier>) => {
    setTicketSales(prev => ({
      ...prev,
      tiers: prev.tiers.map(tier => 
        tier.id === id ? { ...tier, ...updates } : tier
      )
    }));
  };

  const removeTicketTier = (id: string) => {
    setTicketSales(prev => ({
      ...prev,
      tiers: prev.tiers.filter(tier => tier.id !== id)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      ticketSales,
      createdBy: userRole,
      createdAt: new Date().toISOString(),
      status: userRole === 'admin' ? 'published' : 'pending_approval',
      attendees: [],
      ticketsSold: 0,
      totalRaised: 0
    };

    onEventCreated(newEvent);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'fundraiser',
      fundraisingGoal: 0,
      maxAttendees: 0,
      isPublic: true,
      requiresApproval: false,
      coverImage: '',
      tags: [],
    });
    setTicketSales({ enabled: false, tiers: [] });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStep1Valid = eventData.title && eventData.date && eventData.time && eventData.location;
  const isStep2Valid = eventData.description && eventData.category;
  const isFormValid = isStep1Valid && isStep2Valid;

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
              <h2 className="text-2xl font-title text-gray-900">Create New Event</h2>
              <p className="text-gray-600 font-body">
                {userRole === 'admin' ? 'Create and publish events instantly' : 'Create events for admin approval'}
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
                { step: 1, label: 'Event Details' },
                { step: 2, label: 'Description & Settings' },
                { step: 3, label: 'Tickets & Pricing' }
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
              {/* Step 1: Basic Event Details */}
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
                        Event Title *
                      </label>
                      <input
                        type="text"
                        value={eventData.title}
                        onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        placeholder="e.g., Annual Fundraising Gala"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          value={eventData.date}
                          onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="time"
                          value={eventData.time}
                          onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={eventData.location}
                          onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                          placeholder="e.g., Community Center, 123 Main St"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Fundraising Goal ($)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={eventData.fundraisingGoal}
                          onChange={(e) => setEventData(prev => ({ ...prev, fundraisingGoal: parseInt(e.target.value) || 0 }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                          placeholder="5000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-header text-gray-700 mb-2">
                        Max Attendees
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={eventData.maxAttendees}
                          onChange={(e) => setEventData(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) || 0 }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                          placeholder="100"
                        />
                      </div>
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
                      Event Description *
                    </label>
                    <textarea
                      value={eventData.description}
                      onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                      placeholder="Describe your event, what attendees can expect, and how it supports your fundraising goals..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-header text-gray-700 mb-2">
                      Event Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {eventCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <motion.button
                            key={category.value}
                            type="button"
                            onClick={() => setEventData(prev => ({ ...prev, category: category.value }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              eventData.category === category.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                              eventData.category === category.value ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                            <span className={`text-sm font-body ${
                              eventData.category === category.value ? 'text-blue-900' : 'text-gray-700'
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
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {eventData.tags.map((tag) => (
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={eventData.isPublic}
                          onChange={(e) => setEventData(prev => ({ ...prev, isPublic: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-header text-gray-900">Public Event</span>
                          <p className="text-sm text-gray-600 font-body">Visible to all users and on public pages</p>
                        </div>
                      </label>

                      {userRole === 'coach' && (
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={eventData.requiresApproval}
                            onChange={(e) => setEventData(prev => ({ ...prev, requiresApproval: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="font-header text-gray-900">Requires Admin Approval</span>
                            <p className="text-sm text-gray-600 font-body">Event will be reviewed before publishing</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Tickets & Pricing */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="flex items-center space-x-3 mb-4">
                      <input
                        type="checkbox"
                        checked={ticketSales.enabled}
                        onChange={(e) => setTicketSales(prev => ({ ...prev, enabled: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-header text-gray-900">Enable Ticket Sales</span>
                        <p className="text-sm text-gray-600 font-body">Sell tickets for this event with different pricing tiers</p>
                      </div>
                    </label>

                    {ticketSales.enabled && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-header text-gray-900">Ticket Tiers</h4>
                          <button
                            type="button"
                            onClick={addTicketTier}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Tier</span>
                          </button>
                        </div>

                        {ticketSales.tiers.map((tier, index) => (
                          <div key={tier.id} className="border border-gray-200 rounded-xl p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h5 className="font-header text-gray-900">Tier {index + 1}</h5>
                              <button
                                type="button"
                                onClick={() => removeTicketTier(tier.id)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-header text-gray-700 mb-1">
                                  Tier Name
                                </label>
                                <input
                                  type="text"
                                  value={tier.name}
                                  onChange={(e) => updateTicketTier(tier.id, { name: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                                  placeholder="e.g., General Admission"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-header text-gray-700 mb-1">
                                  Price ($)
                                </label>
                                <input
                                  type="number"
                                  value={tier.price}
                                  onChange={(e) => updateTicketTier(tier.id, { price: parseFloat(e.target.value) || 0 })}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                                  placeholder="25"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-header text-gray-700 mb-1">
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  value={tier.quantity}
                                  onChange={(e) => updateTicketTier(tier.id, { quantity: parseInt(e.target.value) || 0 })}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                                  placeholder="100"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-header text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                value={tier.description}
                                onChange={(e) => updateTicketTier(tier.id, { description: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-body resize-none"
                                placeholder="What's included with this ticket tier..."
                              />
                            </div>
                          </div>
                        ))}

                        {ticketSales.tiers.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Ticket className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-body">No ticket tiers added yet. Click "Add Tier" to get started.</p>
                          </div>
                        )}
                      </div>
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
                      <span>Creating Event...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Create Event</span>
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

export default EventCreationModal;