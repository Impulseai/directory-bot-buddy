
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage as ChatMessageType, Business } from '../types';

const ChatView: React.FC = () => {
  const { 
    messages, 
    addMessage, 
    isTyping, 
    setIsTyping, 
    searchBusinesses 
  } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessageType[]>([]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          "Olá! Sou o assistente virtual do diretório de comércios e serviços. Como posso ajudar você hoje? Você pode perguntar sobre restaurantes, supermercados ou qualquer outro estabelecimento em nosso diretório.",
          'bot'
        );
      }, 500);
    }
  }, []);

  // Update local messages when store messages change
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Add typing indicator
  useEffect(() => {
    if (isTyping) {
      setLocalMessages(prev => [
        ...prev,
        {
          id: 'typing-indicator',
          content: '',
          sender: 'bot',
          timestamp: new Date(),
          isTyping: true
        }
      ]);
    } else {
      setLocalMessages(prev => 
        prev.filter(message => message.id !== 'typing-indicator')
      );
    }
  }, [isTyping]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  // Process user message and generate bot response
  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    
    // Set bot as typing
    setIsTyping(true);
    
    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process the message
    const lowerContent = content.toLowerCase();
    let botResponse = '';
    let businesses: Business[] = [];
    
    // Check if it's a search query
    if (
      lowerContent.includes('procur') || 
      lowerContent.includes('encontr') || 
      lowerContent.includes('busc') || 
      lowerContent.includes('quero') || 
      lowerContent.includes('perto') ||
      lowerContent.includes('localiz') ||
      lowerContent.includes('onde') ||
      lowerContent.includes('restaurant') ||
      lowerContent.includes('loja') ||
      lowerContent.includes('mercado') ||
      lowerContent.includes('serviço')
    ) {
      botResponse = "Deixe-me procurar em nosso diretório. Um momento…";
      addMessage(botResponse, 'bot');
      
      // Get search results
      const searchTerm = content.replace(/procurar|encontrar|buscar|quero|perto|localizar|onde/gi, '').trim();
      
      // Wait a bit more for search results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = await searchBusinesses(searchTerm || '');
      
      setIsTyping(false);
      
      if (results.length > 0) {
        botResponse = `Aqui estão alguns resultados para sua busca:`;
        businesses = results;
      } else {
        botResponse = "Não encontrei estabelecimentos que correspondam à sua busca. Poderia tentar com outras palavras?";
      }
    } else if (lowerContent.includes('obrigad')) {
      botResponse = "De nada! Estou aqui para ajudar. Tem mais alguma coisa que eu possa fazer por você?";
    } else if (lowerContent.includes('oi') || lowerContent.includes('olá') || lowerContent.includes('bom dia') || lowerContent.includes('boa tarde') || lowerContent.includes('boa noite')) {
      botResponse = "Olá! Como posso ajudar você hoje? Você pode buscar por estabelecimentos em nosso diretório.";
    } else if (lowerContent.includes('ajud')) {
      botResponse = "Posso te ajudar a encontrar estabelecimentos comerciais e serviços. Experimente perguntar por exemplo: 'Quero encontrar restaurantes na minha área' ou 'Buscar supermercados próximos'.";
    } else {
      botResponse = "Não entendi completamente o que você precisa. Posso ajudar você a encontrar estabelecimentos comerciais e serviços. Por exemplo, tente perguntar: 'Buscar restaurantes' ou 'Encontrar supermercados'.";
    }
    
    // Stop typing and add response
    setIsTyping(false);
    addMessage(botResponse, 'bot', businesses);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="bg-white p-4 rounded-lg shadow flex-1 overflow-y-auto mb-4 custom-scrollbar">
        <div className="flex flex-col">
          {localMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <ChatInput onSubmit={handleSendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default ChatView;
