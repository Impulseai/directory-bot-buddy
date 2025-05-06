
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsView: React.FC = () => {
  const { botConfig, updateBotConfig } = useStore();
  
  const [form, setForm] = useState({
    name: '',
    avatarUrl: '',
    primaryColor: '',
    backgroundColor: '',
  });
  
  useEffect(() => {
    setForm({
      name: botConfig.name,
      avatarUrl: botConfig.avatarUrl,
      primaryColor: botConfig.primaryColor,
      backgroundColor: botConfig.backgroundColor,
    });
  }, [botConfig]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBotConfig(form);
    toast.success('Configurações atualizadas com sucesso!');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações do Chatbot</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Prévia</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="rounded-lg p-4 flex items-start gap-3 max-w-xs"
            style={{ backgroundColor: form.backgroundColor || botConfig.backgroundColor }}
          >
            <img 
              src={form.avatarUrl || botConfig.avatarUrl} 
              alt="Bot Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="mb-1">
                <span 
                  className="text-sm font-medium"
                  style={{ color: form.primaryColor || botConfig.primaryColor }}
                >
                  {form.name || botConfig.name}
                </span>
              </div>
              <div 
                className="bg-gray-100 text-gray-800 rounded-lg p-3"
              >
                <p className="text-sm">
                  Olá! Como posso ajudar você hoje?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Bot</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome do chatbot"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">URL da Imagem do Avatar</Label>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              value={form.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={form.primaryColor}
                onChange={handleChange}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={form.primaryColor}
                onChange={handleChange}
                name="primaryColor"
                placeholder="#4A6FFF"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                name="backgroundColor"
                type="color"
                value={form.backgroundColor}
                onChange={handleChange}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={form.backgroundColor}
                onChange={handleChange}
                name="backgroundColor"
                placeholder="#F9FAFB"
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          Salvar Configurações
        </Button>
      </form>
    </div>
  );
};

export default SettingsView;
