
import React from 'react';
import { ChatMessage as ChatMessageType, BotConfig } from '../types';
import { format } from 'date-fns';
import BusinessCard from './BusinessCard';
import { useStore } from '../store';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { botConfig } = useStore();
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 message-appear`}>
      <div className={`max-w-3/4 ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center mb-1">
            <img 
              src={botConfig.avatarUrl} 
              alt={botConfig.name} 
              className="w-8 h-8 rounded-full mr-2 object-cover" 
            />
            <span className="text-sm font-medium" style={{ color: botConfig.primaryColor }}>
              {botConfig.name}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {format(message.timestamp, 'HH:mm')}
            </span>
          </div>
        )}
        
        <div 
          className={`rounded-lg p-3 inline-block ${
            isBot 
              ? 'bg-gray-100 text-gray-800' 
              : 'text-white'
          }`}
          style={{ 
            backgroundColor: isBot ? '#f3f4f6' : botConfig.primaryColor,
            maxWidth: '100%'
          }}
        >
          {message.isTyping ? (
            <div className="typing-indicator w-12 h-4"></div>
          ) : (
            <p className="whitespace-pre-line">{message.content}</p>
          )}
        </div>
        
        {!isBot && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
          </div>
        )}
        
        {message.businesses && message.businesses.length > 0 && (
          <div className="mt-3 grid gap-3">
            {message.businesses.map(business => (
              <BusinessCard key={business.id} business={business} isResult />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
