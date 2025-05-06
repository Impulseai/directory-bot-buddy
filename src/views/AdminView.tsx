
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Business } from '../types';
import BusinessCard from '../components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import BusinessForm from '../components/BusinessForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AdminView: React.FC = () => {
  const { businesses, searchQuery, setSearchQuery, deleteBusiness } = useStore();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gerenciar Estabelecimentos</h1>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar estabelecimentos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
