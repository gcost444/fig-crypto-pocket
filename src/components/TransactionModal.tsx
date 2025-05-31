
import { useState } from 'react';
import { X } from 'lucide-react';
import { CryptoCurrency } from '@/types/crypto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface TransactionModalProps {
  crypto: CryptoCurrency;
  type: 'buy' | 'sell';
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const TransactionModal = ({ crypto, type, isOpen, onClose, onConfirm }: TransactionModalProps) => {
  const [amount, setAmount] = useState('');
  
  if (!isOpen) return null;

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onConfirm(numAmount);
      setAmount('');
      onClose();
    }
  };

  const total = parseFloat(amount || '0') * crypto.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <Card className="w-full max-w-md rounded-t-3xl p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {type === 'buy' ? 'Comprar' : 'Vender'} {crypto.symbol}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-crypto-blue rounded-full flex items-center justify-center text-white font-bold">
              {crypto.icon}
            </div>
            <div>
              <h3 className="font-medium">{crypto.name}</h3>
              <p className="text-sm text-gray-500">${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade ({crypto.symbol})
              </label>
              <Input
                type="number"
                step="0.00000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total (USD):</span>
                <span className="font-bold text-lg">${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-2xl h-12"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!amount || parseFloat(amount) <= 0}
            className={`flex-1 rounded-2xl h-12 text-white ${
              type === 'buy' 
                ? 'bg-crypto-green hover:bg-green-600' 
                : 'bg-crypto-red hover:bg-red-600'
            }`}
          >
            Confirmar {type === 'buy' ? 'Compra' : 'Venda'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TransactionModal;
