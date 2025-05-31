
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cryptoData } from '@/data/cryptoData';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (cryptoId: string, amountUSD: number) => void;
}

const BuyModal = ({ isOpen, onClose, onBuy }: BuyModalProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amountUSD, setAmountUSD] = useState('');

  if (!isOpen) return null;

  const handleBuy = () => {
    const amount = parseFloat(amountUSD);
    if (selectedCrypto && amount > 0) {
      onBuy(selectedCrypto, amount);
      setSelectedCrypto('');
      setAmountUSD('');
      onClose();
    }
  };

  const selectedCryptoData = cryptoData.find(c => c.id === selectedCrypto);
  const cryptoAmount = selectedCryptoData && amountUSD ? 
    parseFloat(amountUSD) / selectedCryptoData.price : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <Card className="w-full max-w-md rounded-t-3xl p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Comprar Cripto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione a Criptomoeda
            </label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Escolha uma cripto</option>
              {cryptoData.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol}) - ${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor em USD
            </label>
            <Input
              type="number"
              step="0.01"
              value={amountUSD}
              onChange={(e) => setAmountUSD(e.target.value)}
              placeholder="0.00"
              className="text-lg"
            />
          </div>

          {selectedCryptoData && amountUSD && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Você receberá:</span>
                <span className="font-bold">{cryptoAmount.toFixed(8)} {selectedCryptoData.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Preço unitário:</span>
                <span className="font-medium">${selectedCryptoData.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-2xl h-12"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleBuy}
            disabled={!selectedCrypto || !amountUSD || parseFloat(amountUSD) <= 0}
            className="flex-1 rounded-2xl h-12 bg-crypto-green hover:bg-green-600 text-white"
          >
            Comprar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BuyModal;
