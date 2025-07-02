import React, { createContext, useContext, useState, useEffect } from 'react';

interface DonationPage {
  id: string;
  title: string;
  description: string;
  fundraisingGoal: number;
  endDate: string;
  category: string;
  coverImage: string;
  teamName: string;
  allowAnonymous: boolean;
  showLeaderboard: boolean;
  enableSharing: boolean;
  customMessage: string;
  tags: string[];
  selectedPlayers: Array<{
    id: string;
    name: string;
    email: string;
    position: string;
    goal: number;
    avatar: string;
  }>;
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'pending_approval' | 'published' | 'cancelled' | 'completed';
  totalRaised: number;
  donorCount: number;
  shareCount: number;
  leaderboard: Array<{
    playerId: string;
    playerName: string;
    playerAvatar: string;
    raised: number;
    goal: number;
    donorCount: number;
    shareCount: number;
  }>;
  donations: Array<{
    id: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    playerId?: string;
    timestamp: string;
    isAnonymous: boolean;
    message?: string;
  }>;
}

interface DonationPagesContextType {
  donationPages: DonationPage[];
  addDonationPage: (page: DonationPage) => void;
  updateDonationPage: (id: string, updates: Partial<DonationPage>) => void;
  deleteDonationPage: (id: string) => void;
  getDonationPagesByStatus: (status: string) => DonationPage[];
  getDonationPagesByCreator: (creator: string) => DonationPage[];
  getTotalRaisedFromPages: () => number;
  getActivePagesCount: () => number;
  addDonationToPage: (pageId: string, donation: any) => void;
  approveDonationPage: (pageId: string) => void;
  rejectDonationPage: (pageId: string) => void;
  getPlayerLeaderboard: (pageId: string) => any[];
}

const DonationPagesContext = createContext<DonationPagesContextType | undefined>(undefined);

export const useDonationPages = () => {
  const context = useContext(DonationPagesContext);
  if (!context) {
    throw new Error('useDonationPages must be used within a DonationPagesProvider');
  }
  return context;
};

export const DonationPagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donationPages, setDonationPages] = useState<DonationPage[]>([
    // Sample donation pages for demonstration
    {
      id: '1',
      title: 'Help Thunder Soccer Club Reach State Championships',
      description: 'Our team has worked incredibly hard this season and we\'re just one step away from the state championships. We need your support to cover travel expenses, accommodation, and tournament fees.',
      fundraisingGoal: 15000,
      endDate: '2024-04-15',
      category: 'travel',
      coverImage: '',
      teamName: 'Thunder Soccer Club',
      allowAnonymous: true,
      showLeaderboard: true,
      enableSharing: true,
      customMessage: 'Thank you for supporting our journey to state championships! Your contribution means the world to our team.',
      tags: ['championships', 'travel', 'tournament'],
      selectedPlayers: [
        { id: '1', name: 'Sarah Martinez', email: 'sarah@email.com', position: 'Forward', goal: 2000, avatar: 'SM' },
        { id: '2', name: 'Alex Rivera', email: 'alex@email.com', position: 'Midfielder', goal: 1800, avatar: 'AR' },
        { id: '3', name: 'Jordan Smith', email: 'jordan@email.com', position: 'Defender', goal: 1500, avatar: 'JS' }
      ],
      createdBy: 'admin',
      createdAt: '2024-01-20T10:00:00Z',
      status: 'published',
      totalRaised: 8750,
      donorCount: 35,
      shareCount: 127,
      leaderboard: [
        { playerId: '1', playerName: 'Sarah Martinez', playerAvatar: 'SM', raised: 3200, goal: 2000, donorCount: 15, shareCount: 45 },
        { playerId: '2', playerName: 'Alex Rivera', playerAvatar: 'AR', raised: 2800, goal: 1800, donorCount: 12, shareCount: 38 },
        { playerId: '3', playerName: 'Jordan Smith', playerAvatar: 'JS', raised: 2750, goal: 1500, donorCount: 8, shareCount: 44 }
      ],
      donations: [
        {
          id: 'd1',
          amount: 250,
          donorName: 'Mike Rodriguez',
          donorEmail: 'mike@email.com',
          playerId: '1',
          timestamp: '2024-02-01T14:30:00Z',
          isAnonymous: false,
          message: 'Go Thunder! Proud to support Sarah!'
        },
        {
          id: 'd2',
          amount: 150,
          donorName: 'Anonymous',
          donorEmail: '',
          playerId: '2',
          timestamp: '2024-02-02T09:15:00Z',
          isAnonymous: true
        }
      ]
    },
    {
      id: '2',
      title: 'New Equipment for Thunder Soccer Club',
      description: 'We need new training equipment, uniforms, and gear to help our players perform at their best. Every contribution helps us provide better resources for our team.',
      fundraisingGoal: 8000,
      endDate: '2024-03-30',
      category: 'equipment',
      coverImage: '',
      teamName: 'Thunder Soccer Club',
      allowAnonymous: true,
      showLeaderboard: true,
      enableSharing: true,
      customMessage: 'Thank you for helping us get the equipment we need to succeed!',
      tags: ['equipment', 'uniforms', 'training'],
      selectedPlayers: [
        { id: '4', name: 'Casey Brown', email: 'casey@email.com', position: 'Goalkeeper', goal: 1200, avatar: 'CB' },
        { id: '5', name: 'Taylor Davis', email: 'taylor@email.com', position: 'Forward', goal: 1000, avatar: 'TD' }
      ],
      createdBy: 'coach',
      createdAt: '2024-02-01T16:00:00Z',
      status: 'pending_approval',
      totalRaised: 2450,
      donorCount: 18,
      shareCount: 67,
      leaderboard: [
        { playerId: '4', playerName: 'Casey Brown', playerAvatar: 'CB', raised: 1350, goal: 1200, donorCount: 10, shareCount: 32 },
        { playerId: '5', playerName: 'Taylor Davis', playerAvatar: 'TD', raised: 1100, goal: 1000, donorCount: 8, shareCount: 35 }
      ],
      donations: [
        {
          id: 'd3',
          amount: 100,
          donorName: 'Emma Johnson',
          donorEmail: 'emma@email.com',
          playerId: '4',
          timestamp: '2024-02-03T11:20:00Z',
          isAnonymous: false,
          message: 'Great job Casey!'
        }
      ]
    }
  ]);

  const addDonationPage = (page: DonationPage) => {
    const newPage = {
      ...page,
      donations: [],
      totalRaised: 0,
      donorCount: 0,
      shareCount: 0
    };
    setDonationPages(prev => [...prev, newPage]);
  };

  const updateDonationPage = (id: string, updates: Partial<DonationPage>) => {
    setDonationPages(prev => prev.map(page => 
      page.id === id ? { ...page, ...updates } : page
    ));
  };

  const deleteDonationPage = (id: string) => {
    setDonationPages(prev => prev.filter(page => page.id !== id));
  };

  const getDonationPagesByStatus = (status: string) => {
    return donationPages.filter(page => page.status === status);
  };

  const getDonationPagesByCreator = (creator: string) => {
    return donationPages.filter(page => page.createdBy === creator);
  };

  const getTotalRaisedFromPages = () => {
    return donationPages
      .filter(page => page.status === 'published')
      .reduce((total, page) => total + page.totalRaised, 0);
  };

  const getActivePagesCount = () => {
    const now = new Date();
    return donationPages.filter(page => {
      if (page.status !== 'published') return false;
      const endDate = new Date(page.endDate);
      return endDate >= now;
    }).length;
  };

  const addDonationToPage = (pageId: string, donation: any) => {
    setDonationPages(prev => prev.map(page => {
      if (page.id === pageId) {
        const newDonations = [...page.donations, donation];
        const newTotalRaised = newDonations.reduce((sum, d) => sum + d.amount, 0);
        const newDonorCount = newDonations.length;
        
        // Update leaderboard
        const updatedLeaderboard = page.leaderboard.map(player => {
          if (player.playerId === donation.playerId) {
            const playerDonations = newDonations.filter(d => d.playerId === player.playerId);
            const playerRaised = playerDonations.reduce((sum, d) => sum + d.amount, 0);
            return {
              ...player,
              raised: playerRaised,
              donorCount: playerDonations.length
            };
          }
          return player;
        });
        
        return {
          ...page,
          donations: newDonations,
          totalRaised: newTotalRaised,
          donorCount: newDonorCount,
          leaderboard: updatedLeaderboard
        };
      }
      return page;
    }));
  };

  const approveDonationPage = (pageId: string) => {
    updateDonationPage(pageId, { status: 'published' });
  };

  const rejectDonationPage = (pageId: string) => {
    updateDonationPage(pageId, { status: 'cancelled' });
  };

  const getPlayerLeaderboard = (pageId: string) => {
    const page = donationPages.find(p => p.id === pageId);
    if (!page) return [];
    
    return page.leaderboard.sort((a, b) => b.raised - a.raised);
  };

  // Simulate real-time donations for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      const publishedPages = donationPages.filter(p => p.status === 'published');
      if (publishedPages.length > 0) {
        const randomPage = publishedPages[Math.floor(Math.random() * publishedPages.length)];
        const donorNames = ['Michael Chen', 'Lisa Wang', 'David Park', 'Sarah Kim', 'James Lee'];
        const randomDonor = donorNames[Math.floor(Math.random() * donorNames.length)];
        const randomAmount = Math.floor(Math.random() * 150) + 25;
        const randomPlayer = randomPage.selectedPlayers[Math.floor(Math.random() * randomPage.selectedPlayers.length)];
        
        // Only add donation 8% of the time to avoid spam
        if (Math.random() < 0.08) {
          const newDonation = {
            id: `d${Date.now()}`,
            amount: randomAmount,
            donorName: randomDonor,
            donorEmail: `${randomDonor.toLowerCase().replace(' ', '.')}@email.com`,
            playerId: randomPlayer.id,
            timestamp: new Date().toISOString(),
            isAnonymous: Math.random() < 0.2,
            message: Math.random() < 0.3 ? `Go ${randomPlayer.name}! Keep up the great work!` : undefined
          };
          
          addDonationToPage(randomPage.id, newDonation);
        }
      }
    }, 25000); // Check every 25 seconds

    return () => clearInterval(interval);
  }, [donationPages]);

  return (
    <DonationPagesContext.Provider value={{
      donationPages,
      addDonationPage,
      updateDonationPage,
      deleteDonationPage,
      getDonationPagesByStatus,
      getDonationPagesByCreator,
      getTotalRaisedFromPages,
      getActivePagesCount,
      addDonationToPage,
      approveDonationPage,
      rejectDonationPage,
      getPlayerLeaderboard
    }}>
      {children}
    </DonationPagesContext.Provider>
  );
};