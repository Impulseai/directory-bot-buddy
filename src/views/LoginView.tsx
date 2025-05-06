
import React, { useState } from 'react';
import { useStore } from '../store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

const LoginView: React.FC = () => {
  const { login, setCurrentView, botConfig } = useStore();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }
    
    const success = login(username, password);
    
    if (success) {
      toast.success('Login realizado com sucesso!');
      setCurrentView('admin');
    } else {
      setError('Usuário ou senha incorretos');
      toast.error('Falha ao fazer login');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Área Administrativa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <div 
              className="h-20 w-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: botConfig.primaryColor }}
            >
              <Lock className="h-10 w-10 text-white" />
            </div>
          </div>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>Usuário padrão: admin</p>
              <p>Senha padrão: admin123</p>
              <p>Você pode alterar nas configurações</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginView;
