
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Business } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface BusinessFormProps {
  business: Business | null;
  onClose: () => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ business, onClose }) => {
  const { addBusiness, updateBusiness } = useStore();
  
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    notes: '',
    imageUrl: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone: '',
    imageUrl: '',
  });
  
  // Initialize form if editing
  useEffect(() => {
    if (business) {
      setForm({
        name: business.name,
        address: business.address,
        phone: business.phone,
        notes: business.notes,
        imageUrl: business.imageUrl,
      });
    }
  }, [business]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', address: '', phone: '', imageUrl: '' };
    
    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }
    
    if (!form.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
      valid = false;
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
      valid = false;
    }
    
    if (!form.imageUrl.trim()) {
      newErrors.imageUrl = 'URL da imagem é obrigatória';
      valid = false;
    } else {
      // Validar se é uma URL ou um formato de imagem válido
      const isValidUrl = /^(https?:\/\/)/.test(form.imageUrl);
      const isValidImageFormat = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(form.imageUrl);
      
      if (!isValidUrl && !isValidImageFormat) {
        newErrors.imageUrl = 'URL da imagem inválida. Use uma URL completa ou formato de imagem válido (jpeg, jpg, png, gif, bmp, webp)';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (business) {
      updateBusiness(business.id, form);
      toast.success('Estabelecimento atualizado com sucesso!');
    } else {
      addBusiness(form);
      toast.success('Estabelecimento adicionado com sucesso!');
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome do estabelecimento"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Endereço completo"
          />
          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(00) 0000-0000"
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL da Imagem</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg ou formato da imagem"
          />
          <p className="text-xs text-gray-500">Aceita URLs ou formatos: jpg, jpeg, png, gif, bmp, webp</p>
          {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Informações adicionais (opcional)"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {business ? 'Salvar Alterações' : 'Adicionar'}
        </Button>
      </div>
    </form>
  );
};

export default BusinessForm;
