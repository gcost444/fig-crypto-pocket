
import { ArrowDown, ArrowUp, TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoCurrency } from '@/types/crypto';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CryptoDetailProps {
  crypto: CryptoCurrency;
  onBack: () => void;
  onBuy: (crypto: CryptoCurrency) => void;
  onSell: (crypto: CryptoCurrency) => void;
}

const CryptoDetail = ({ crypto, onBack, onBuy, onSell }: CryptoDetailProps) => {
  const totalValue = crypto.balance * crypto.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6">
        <button 
          onClick={onBack}
          className="mb-4 text-white hover:text-gray-200"
        >
          ← Voltar
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {crypto.icon}
          </div>
          <h1 className="text-2xl font-bold">{crypto.name}</h1>
          <p className="text-lg opacity-90">{crypto.symbol}</p>
        </div>
      </div>

      <div className="p-4 -mt-6">
        <Card className="p-6 mb-4">
          <div className="text-center mb-6">
            <p className="text-2xl font-bold">${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <div className={`flex items-center justify-center mt-2 ${crypto.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
              {crypto.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1">{crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}% (24h)</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Seu saldo:</span>
              <span className="font-medium">{crypto.balance} {crypto.symbol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor total:</span>
              <span className="font-bold text-lg">${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => onBuy(crypto)}
              className="flex-1 bg-crypto-green hover:bg-green-600 text-white rounded-2xl h-12"
            >
              <ArrowDown size={18} className="mr-2" />
              Comprar
            </Button>
            <Button 
              onClick={() => onSell(crypto)}
              className="flex-1 bg-crypto-red hover:bg-red-600 text-white rounded-2xl h-12"
            >
              <ArrowUp size={18} className="mr-2" />
              Vender
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Gráfico de Preços</h3>
          <div className="h-32 bg-gradient-to-r from-crypto-green to-crypto-blue rounded-lg flex items-end justify-center">
            <p className="text-white text-sm mb-4">Gráfico em desenvolvimento</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDetail;
