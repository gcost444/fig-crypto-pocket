
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoCurrency } from '@/types/crypto';
import { Card } from '@/components/ui/card';

interface CryptoListProps {
  cryptos: CryptoCurrency[];
  onCryptoSelect: (crypto: CryptoCurrency) => void;
}

const CryptoList = ({ cryptos, onCryptoSelect }: CryptoListProps) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Suas criptomoedas</h3>
      <div className="space-y-3">
        {cryptos.map((crypto) => (
          <Card 
            key={crypto.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onCryptoSelect(crypto)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-crypto-blue rounded-full flex items-center justify-center text-white font-bold">
                  {crypto.icon}
                </div>
                <div>
                  <h4 className="font-medium">{crypto.name}</h4>
                  <p className="text-sm text-gray-500">{crypto.symbol}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className={`flex items-center text-sm ${crypto.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {crypto.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span className="ml-1">{Math.abs(crypto.change24h)}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm text-gray-500">Saldo:</span>
              <span className="text-sm font-medium">{crypto.balance} {crypto.symbol}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
