
import React from 'react';
import { ChatMessage as ChatMessageType, BotConfig } from '../types';
import BusinessCard from './BusinessCard';

interface ChatMessageProps {
  message: ChatMessageType;
  botConfig: BotConfig;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, botConfig }) => {
  if (message.isTyping) {
    return (
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={botConfig.avatarUrl} 
          alt="Bot Avatar" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div
          className="rounded-lg p-4 flex items-center"
          style={{ backgroundColor: botConfig.chatMessageBgColor }}
        >
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-4 ${message.sender === 'bot' ? 'flex items-start gap-3' : 'flex items-start gap-3 justify-end'}`}>
      {message.sender === 'bot' && (
        <img 
          src={botConfig.avatarUrl} 
          alt="Bot Avatar" 
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      
      <div>
        {message.sender === 'bot' && (
          <div className="mb-1">
            <span 
              className="text-sm font-medium"
              style={{ color: botConfig.primaryColor }}
            >
              {botConfig.name}
            </span>
          </div>
        )}
        
        <div 
          className={`rounded-lg p-3 ${
            message.sender === 'bot' ? '' : 'bg-primary text-white'
          }`}
          style={{ 
            backgroundColor: message.sender === 'bot' ? botConfig.chatMessageBgColor : undefined,
          }}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        
        {message.businesses && message.businesses.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.businesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={business} 
                isResult={true} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
