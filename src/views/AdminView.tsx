
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Business } from '../types';
import BusinessCard from '../components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, LogOut, Settings } from 'lucide-react';
import BusinessForm from '../components/BusinessForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import AdminSettings from '../components/AdminSettings';
import { toast } from 'sonner';

const AdminView: React.FC = () => {
  const { businesses, searchQuery, setSearchQuery, deleteBusiness, logout, setCurrentView } = useStore();
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  
  // Filter businesses when search query changes
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query) {
      const filtered = businesses.filter(business =>
        business.name.toLowerCase().includes(query) ||
        business.address.toLowerCase().includes(query) ||
        business.notes.toLowerCase().includes(query)
      );
      setFilteredBusinesses(filtered);
    } else {
      setFilteredBusinesses(businesses);
    }
  }, [businesses, searchQuery]);

  const handleEdit = (business: Business) => {
    setCurrentBusiness(business);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este estabelecimento?")) {
      deleteBusiness(id);
    }
  };

  const handleAddNew = () => {
    setCurrentBusiness(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentBusiness(null);
  };
  
  const handleLogout = () => {
    logout();
    setCurrentView('chat');
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Área Administrativa</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="businesses" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="businesses" className="flex-1">Estabelecimentos</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="businesses" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar estabelecimentos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {filteredBusinesses.map(business => (
              <BusinessCard
                key={business.id}
                business={business}
                onEdit={() => handleEdit(business)}
                onDelete={() => handleDelete(business.id)}
              />
            ))}
            
            {filteredBusinesses.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Nenhum estabelecimento encontrado.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="pt-4 space-y-6">
          <AdminSettings />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isFormOpen} onOpenChange={handleFormClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentBusiness ? 'Editar Estabelecimento' : 'Adicionar Estabelecimento'}
            </DialogTitle>
          </DialogHeader>
          <BusinessForm 
            business={currentBusiness}
            onClose={handleFormClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminView;
