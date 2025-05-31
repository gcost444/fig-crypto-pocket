
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SuccessModalProps {
  isOpen: boolean;
  type: 'buy' | 'sell';
  crypto: string;
  amount: number;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, type, crypto, amount, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-crypto-green rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-white" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Transação realizada!
        </h2>
        
        <p className="text-gray-600 mb-6">
          {type === 'buy' ? 'Compra' : 'Venda'} de {amount} {crypto} realizada com sucesso
        </p>
        
        <Button
          onClick={onClose}
          className="w-full bg-crypto-blue hover:bg-blue-700 text-white rounded-xl h-12"
        >
          Continuar
        </Button>
      </Card>
    </div>
  );
};

export default SuccessModal;
