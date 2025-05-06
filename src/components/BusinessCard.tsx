
import React from 'react';
import { Business } from '../types';
import { Card, CardContent } from '@/components/ui/card';

interface BusinessCardProps {
  business: Business;
  isResult?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ 
  business, 
  isResult, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className={`overflow-hidden ${isResult ? 'w-full' : 'w-full'} bg-white`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 min-w-20 rounded-md overflow-hidden">
            <img 
              src={business.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop'} 
              alt={business.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <h3 className="font-semibold text-lg">{business.name}</h3>
            
            <div className="text-sm text-gray-700 mt-1">
              <p>{business.address}</p>
              <p>Tel: {business.phone}</p>
              {business.notes && (
                <p className="text-xs text-gray-600 mt-1">{business.notes}</p>
              )}
            </div>
            
            {!isResult && onEdit && onDelete && (
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={onEdit}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  Editar
                </button>
                <button 
                  onClick={onDelete}
                  className="text-xs px-3 py-1 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
