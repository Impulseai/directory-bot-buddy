
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Business, ChatMessage, BotConfig, AuthState } from '../types';

interface Store {
  // Businesses
  businesses: Business[];
  addBusiness: (business: Omit<Business, 'id'>) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  
  // Chat messages
  messages: ChatMessage[];
  addMessage: (content: string, sender: 'user' | 'bot', businesses?: Business[]) => void;
  clearMessages: () => void;
  
  // Bot configuration
  botConfig: BotConfig;
  updateBotConfig: (config: Partial<BotConfig>) => void;
  
  // Authentication
  auth: AuthState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // UI State
  currentView: 'chat' | 'admin' | 'login';
  setCurrentView: (view: 'chat' | 'admin' | 'login') => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Utility
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  
  // Simulated search function
  searchBusinesses: (query: string) => Promise<Business[]>;
}

// Initial demo data
const demoBusinesses: Business[] = [
  {
    id: '1',
    name: 'Restaurante Sabor Gourmet',
    address: 'Rua das Acácias, 44',
    phone: '(11) 3333-4444',
    notes: 'Culinária internacional com ambiente sofisticado.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Delícias do Chef',
    address: 'Av. Marginal, 120',
    phone: '(11) 5555-6666',
    notes: 'Especializado em pratos executivos para almoço.',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Supermercado Economia',
    address: 'Av. Principal, 500',
    phone: '(11) 7777-8888',
    notes: 'Preços baixos e grande variedade de produtos.',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop',
  }
];

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      businesses: demoBusinesses,
      addBusiness: (business) => 
        set((state) => ({ 
          businesses: [...state.businesses, { ...business, id: uuidv4() }] 
        })),
      updateBusiness: (id, business) => 
        set((state) => ({ 
          businesses: state.businesses.map((b) => 
            b.id === id ? { ...b, ...business } : b
          ) 
        })),
      deleteBusiness: (id) => 
        set((state) => ({ 
          businesses: state.businesses.filter((b) => b.id !== id) 
        })),
      
      messages: [],
      addMessage: (content, sender, businesses = []) => 
        set((state) => ({ 
          messages: [...state.messages, { 
            id: uuidv4(), 
            content, 
            sender, 
            timestamp: new Date(),
            businesses 
          }] 
        })),
      clearMessages: () => set({ messages: [] }),
      
      botConfig: {
        name: 'DiretórioBot',
        avatarUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=50&h=50&fit=crop',
        primaryColor: '#4A6FFF',
        backgroundColor: '#F9FAFB',
        chatBackgroundColor: '#F0F2F5',
        chatMessageBgColor: '#FFFFFF',
        adminUsername: 'admin',
        adminPassword: 'admin123',
      },
      updateBotConfig: (config) => 
        set((state) => ({ 
          botConfig: { ...state.botConfig, ...config } 
        })),
      
      // Authentication
      auth: {
        isLoggedIn: false,
        username: '',
      },
      login: (username, password) => {
        const { botConfig } = get();
        if (username === botConfig.adminUsername && password === botConfig.adminPassword) {
          set({ auth: { isLoggedIn: true, username } });
          return true;
        }
        return false;
      },
      logout: () => set({ auth: { isLoggedIn: false, username: '' } }),
      
      currentView: 'chat',
      setCurrentView: (view) => set({ currentView: view }),
      
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      isTyping: false,
      setIsTyping: (isTyping) => set({ isTyping }),
      
      searchBusinesses: async (query) => {
        const { businesses } = get();
        const lowerQuery = query.toLowerCase();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return businesses.filter(business => 
          business.name.toLowerCase().includes(lowerQuery) || 
          business.address.toLowerCase().includes(lowerQuery) ||
          business.notes.toLowerCase().includes(lowerQuery)
        );
      }
    }),
    {
      name: 'directory-bot-storage',
      partialize: (state) => ({
        businesses: state.businesses,
        botConfig: state.botConfig,
        auth: { isLoggedIn: false, username: '' }, // Sempre iniciar deslogado
      }),
    }
  )
);
