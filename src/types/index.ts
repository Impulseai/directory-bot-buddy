
export interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  businesses?: Business[];
  isTyping?: boolean;
}

export interface BotConfig {
  name: string;
  avatarUrl: string;
  primaryColor: string;
  backgroundColor: string;
  chatBackgroundColor: string;
  chatMessageBgColor: string;
  adminUsername: string;
  adminPassword: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}
