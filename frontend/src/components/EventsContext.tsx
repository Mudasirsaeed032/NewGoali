import React, { createContext, useContext, useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  fundraisingGoal: number;
  maxAttendees: number;
  isPublic: boolean;
  requiresApproval: boolean;
  coverImage: string;
  tags: string[];
  ticketSales: {
    enabled: boolean;
    tiers: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      description: string;
      perks: string[];
    }>;
  };
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'pending_approval' | 'published' | 'cancelled';
  attendees: string[];
  ticketsSold: number;
  totalRaised: number;
  donations: Array<{
    id: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    timestamp: string;
    type: 'ticket' | 'donation' | 'sponsorship';
  }>;
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByStatus: (status: string) => Event[];
  getEventsByCreator: (creator: string) => Event[];
  getTotalRaised: () => number;
  getActiveEventsCount: () => number;
  addDonationToEvent: (eventId: string, donation: any) => void;
  approveEvent: (eventId: string) => void;
  rejectEvent: (eventId: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    // Sample events for demonstration
    {
      id: '1',
      title: 'Annual Fundraising Gala',
      description: 'Join us for an elegant evening of dining, entertainment, and fundraising to support our team\'s championship goals.',
      date: '2024-03-15',
      time: '18:00',
      location: 'Grand Ballroom, Downtown Hotel',
      category: 'fundraiser',
      fundraisingGoal: 15000,
      maxAttendees: 200,
      isPublic: true,
      requiresApproval: false,
      coverImage: '',
      tags: ['formal', 'dinner', 'auction'],
      ticketSales: {
        enabled: true,
        tiers: [
          {
            id: '1',
            name: 'General Admission',
            price: 75,
            quantity: 150,
            description: 'Includes dinner and entertainment',
            perks: []
          },
          {
            id: '2',
            name: 'VIP Table',
            price: 150,
            quantity: 50,
            description: 'Premium seating with exclusive perks',
            perks: ['Reserved table', 'Welcome cocktail', 'Meet & greet']
          }
        ]
      },
      createdBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      status: 'published',
      attendees: [],
      ticketsSold: 45,
      totalRaised: 4500,
      donations: [
        {
          id: 'd1',
          amount: 150,
          donorName: 'Sarah Martinez',
          donorEmail: 'sarah@email.com',
          timestamp: '2024-02-01T10:00:00Z',
          type: 'ticket'
        },
        {
          id: 'd2',
          amount: 250,
          donorName: 'Mike Rodriguez',
          donorEmail: 'mike@email.com',
          timestamp: '2024-02-02T14:30:00Z',
          type: 'donation'
        }
      ]
    },
    {
      id: '2',
      title: 'Spring Training Camp',
      description: 'Intensive 3-day training camp to prepare for the upcoming season.',
      date: '2024-02-20',
      time: '09:00',
      location: 'Sports Complex Field A',
      category: 'training',
      fundraisingGoal: 5000,
      maxAttendees: 50,
      isPublic: true,
      requiresApproval: false,
      coverImage: '',
      tags: ['training', 'skills', 'conditioning'],
      ticketSales: {
        enabled: true,
        tiers: [
          {
            id: '3',
            name: 'Player Registration',
            price: 100,
            quantity: 50,
            description: 'Full 3-day training program',
            perks: []
          }
        ]
      },
      createdBy: 'coach',
      createdAt: '2024-01-10T14:30:00Z',
      status: 'published',
      attendees: [],
      ticketsSold: 28,
      totalRaised: 2800,
      donations: [
        {
          id: 'd3',
          amount: 100,
          donorName: 'Emma Johnson',
          donorEmail: 'emma@email.com',
          timestamp: '2024-02-03T09:15:00Z',
          type: 'ticket'
        }
      ]
    },
    {
      id: '3',
      title: 'Equipment Fundraiser',
      description: 'Help us raise funds for new team equipment and uniforms.',
      date: '2024-04-10',
      time: '15:00',
      location: 'School Gymnasium',
      category: 'fundraiser',
      fundraisingGoal: 8000,
      maxAttendees: 150,
      isPublic: true,
      requiresApproval: false,
      coverImage: '',
      tags: ['equipment', 'uniforms', 'gear'],
      ticketSales: {
        enabled: false,
        tiers: []
      },
      createdBy: 'coach',
      createdAt: '2024-02-05T11:00:00Z',
      status: 'pending_approval',
      attendees: [],
      ticketsSold: 0,
      totalRaised: 1250,
      donations: [
        {
          id: 'd4',
          amount: 500,
          donorName: 'David Chen',
          donorEmail: 'david@email.com',
          timestamp: '2024-02-06T16:20:00Z',
          type: 'donation'
        },
        {
          id: 'd5',
          amount: 750,
          donorName: 'Lisa Thompson',
          donorEmail: 'lisa@email.com',
          timestamp: '2024-02-07T12:45:00Z',
          type: 'sponsorship'
        }
      ]
    }
  ]);

  const addEvent = (event: Event) => {
    const newEvent = {
      ...event,
      donations: [],
      totalRaised: 0,
      ticketsSold: 0,
      attendees: []
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventsByStatus = (status: string) => {
    return events.filter(event => event.status === status);
  };

  const getEventsByCreator = (creator: string) => {
    return events.filter(event => event.createdBy === creator);
  };

  const getTotalRaised = () => {
    return events
      .filter(event => event.status === 'published')
      .reduce((total, event) => total + event.totalRaised, 0);
  };

  const getActiveEventsCount = () => {
    const now = new Date();
    return events.filter(event => {
      if (event.status !== 'published') return false;
      const eventDate = new Date(event.date);
      return eventDate >= now;
    }).length;
  };

  const addDonationToEvent = (eventId: string, donation: any) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const newDonations = [...event.donations, donation];
        const newTotalRaised = newDonations.reduce((sum, d) => sum + d.amount, 0);
        const newTicketsSold = donation.type === 'ticket' ? event.ticketsSold + 1 : event.ticketsSold;
        
        return {
          ...event,
          donations: newDonations,
          totalRaised: newTotalRaised,
          ticketsSold: newTicketsSold
        };
      }
      return event;
    }));
  };

  const approveEvent = (eventId: string) => {
    updateEvent(eventId, { status: 'published' });
  };

  const rejectEvent = (eventId: string) => {
    updateEvent(eventId, { status: 'cancelled' });
  };

  // Simulate real-time donations for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      const publishedEvents = events.filter(e => e.status === 'published');
      if (publishedEvents.length > 0) {
        const randomEvent = publishedEvents[Math.floor(Math.random() * publishedEvents.length)];
        const donorNames = ['Alex Rivera', 'Jordan Smith', 'Casey Brown', 'Taylor Davis', 'Morgan Lee'];
        const randomDonor = donorNames[Math.floor(Math.random() * donorNames.length)];
        const randomAmount = Math.floor(Math.random() * 200) + 25;
        
        // Only add donation 10% of the time to avoid spam
        if (Math.random() < 0.1) {
          const newDonation = {
            id: `d${Date.now()}`,
            amount: randomAmount,
            donorName: randomDonor,
            donorEmail: `${randomDonor.toLowerCase().replace(' ', '.')}@email.com`,
            timestamp: new Date().toISOString(),
            type: 'donation' as const
          };
          
          addDonationToEvent(randomEvent.id, newDonation);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [events]);

  return (
    <EventsContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventsByStatus,
      getEventsByCreator,
      getTotalRaised,
      getActiveEventsCount,
      addDonationToEvent,
      approveEvent,
      rejectEvent
    }}>
      {children}
    </EventsContext.Provider>
  );
};