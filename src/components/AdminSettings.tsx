
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AdminSettings: React.FC = () => {
  const { botConfig, updateBotConfig } = useStore();
  
  const [form, setForm] = useState({
    name: '',
    avatarUrl: '',
    primaryColor: '',
    backgroundColor: '',
    chatBackgroundColor: '',
    chatMessageBgColor: '',
    adminUsername: '',
    adminPassword: '',
    adminPasswordConfirm: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    avatarUrl: '',
    adminUsername: '',
    adminPassword: '',
    adminPasswordConfirm: '',
  });
  
  useEffect(() => {
    setForm({
      name: botConfig.name,
      avatarUrl: botConfig.avatarUrl,
      primaryColor: botConfig.primaryColor,
      backgroundColor: botConfig.backgroundColor,
      chatBackgroundColor: botConfig.chatBackgroundColor,
      chatMessageBgColor: botConfig.chatMessageBgColor,
      adminUsername: botConfig.adminUsername,
      adminPassword: '',
      adminPasswordConfirm: '',
    });
  }, [botConfig]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      name: '', 
      avatarUrl: '', 
      adminUsername: '', 
      adminPassword: '', 
      adminPasswordConfirm: '' 
    };
    
    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }
    
    if (!form.avatarUrl.trim()) {
      newErrors.avatarUrl = 'URL do avatar é obrigatória';
      valid = false;
    }
    
    if (!form.adminUsername.trim()) {
      newErrors.adminUsername = 'Nome de usuário é obrigatório';
      valid = false;
    }
    
    // Apenas validar senhas se ambos os campos estiverem preenchidos (para atualização)
    if (form.adminPassword || form.adminPasswordConfirm) {
      if (form.adminPassword !== form.adminPasswordConfirm) {
        newErrors.adminPasswordConfirm = 'As senhas não coincidem';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const updateData = {
      name: form.name,
      avatarUrl: form.avatarUrl,
      primaryColor: form.primaryColor,
      backgroundColor: form.backgroundColor,
      chatBackgroundColor: form.chatBackgroundColor,
      chatMessageBgColor: form.chatMessageBgColor,
      adminUsername: form.adminUsername,
    };
    
    // Só adicionar a senha se ela for preenchida
    if (form.adminPassword) {
      updateData['adminPassword'] = form.adminPassword;
    }
    
    updateBotConfig(updateData);
    toast.success('Configurações atualizadas com sucesso!');
    
    // Limpar campos de senha
    setForm(prev => ({
      ...prev,
      adminPassword: '',
      adminPasswordConfirm: '',
    }));
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Identidade Visual</CardTitle>
          </CardHeader>
          <CardContent>
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
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
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
                {errors.avatarUrl && <p className="text-sm text-destructive">{errors.avatarUrl}</p>}
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
                <Label htmlFor="backgroundColor">Cor de Fundo do Cabeçalho</Label>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aparência do Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="chatBackgroundColor">Cor de Fundo do Chat</Label>
                <div className="flex gap-2">
                  <Input
                    id="chatBackgroundColor"
                    name="chatBackgroundColor"
                    type="color"
                    value={form.chatBackgroundColor}
                    onChange={handleChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={form.chatBackgroundColor}
                    onChange={handleChange}
                    name="chatBackgroundColor"
                    placeholder="#F0F2F5"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chatMessageBgColor">Cor de Fundo das Mensagens</Label>
                <div className="flex gap-2">
                  <Input
                    id="chatMessageBgColor"
                    name="chatMessageBgColor"
                    type="color"
                    value={form.chatMessageBgColor}
                    onChange={handleChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={form.chatMessageBgColor}
                    onChange={handleChange}
                    name="chatMessageBgColor"
                    placeholder="#FFFFFF"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="border rounded-lg p-4" style={{ backgroundColor: form.chatBackgroundColor }}>
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={form.avatarUrl} 
                    alt="Bot Avatar" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div 
                    className="rounded-lg p-3 max-w-[80%]"
                    style={{ backgroundColor: form.chatMessageBgColor }}
                  >
                    <span style={{ color: form.primaryColor }} className="text-sm font-medium block mb-1">
                      {form.name}
                    </span>
                    <p className="text-sm">Olá! Como posso ajudar você hoje?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="rounded-lg p-3 bg-primary text-white max-w-[80%]">
                    <p className="text-sm">Quero encontrar restaurantes próximos.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Credenciais de Acesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="adminUsername">Usuário de Administrador</Label>
                <Input
                  id="adminUsername"
                  name="adminUsername"
                  value={form.adminUsername}
                  onChange={handleChange}
                  placeholder="Nome de usuário"
                />
                {errors.adminUsername && <p className="text-sm text-destructive">{errors.adminUsername}</p>}
              </div>
              
              <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Nova Senha</Label>
                  <Input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    value={form.adminPassword}
                    onChange={handleChange}
                    placeholder="Deixe em branco para manter a atual"
                  />
                  {errors.adminPassword && <p className="text-sm text-destructive">{errors.adminPassword}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adminPasswordConfirm">Confirmar Nova Senha</Label>
                  <Input
                    id="adminPasswordConfirm"
                    name="adminPasswordConfirm"
                    type="password"
                    value={form.adminPasswordConfirm}
                    onChange={handleChange}
                    placeholder="Confirme a nova senha"
                  />
                  {errors.adminPasswordConfirm && <p className="text-sm text-destructive">{errors.adminPasswordConfirm}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full">
          Salvar Configurações
        </Button>
      </form>
    </div>
  );
};

export default AdminSettings;
