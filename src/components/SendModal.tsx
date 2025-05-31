
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CryptoCurrency } from '@/types/crypto';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCryptos: CryptoCurrency[];
  onSend: (cryptoId: string, amount: number, address: string) => void;
}

const SendModal = ({ isOpen, onClose, userCryptos, onSend }: SendModalProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    const numAmount = parseFloat(amount);
    if (selectedCrypto && numAmount > 0 && address) {
      onSend(selectedCrypto, numAmount, address);
      setSelectedCrypto('');
      setAmount('');
      setAddress('');
      onClose();
    }
  };

  const selectedCryptoData = userCryptos.find(c => c.id === selectedCrypto);
  const maxAmount = selectedCryptoData?.balance || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <Card className="w-full max-w-md rounded-t-3xl p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Enviar Cripto</h2>
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
              {userCryptos.filter(crypto => crypto.balance > 0).map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} - Saldo: {crypto.balance} {crypto.symbol}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <Input
              type="number"
              step="0.00000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              max={maxAmount}
              className="text-lg"
            />
            {selectedCryptoData && (
              <p className="text-sm text-gray-500 mt-1">
                Saldo disponível: {maxAmount} {selectedCryptoData.symbol}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço de destino
            </label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              className="text-sm"
            />
          </div>

          {selectedCryptoData && amount && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Valor estimado:</span>
                <span className="font-bold">${(parseFloat(amount) * selectedCryptoData.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
            onClick={handleSend}
            disabled={!selectedCrypto || !amount || !address || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
            className="flex-1 rounded-2xl h-12 bg-crypto-red hover:bg-red-600 text-white"
          >
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SendModal;
