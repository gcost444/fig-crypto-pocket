
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoCurrency } from '@/types/crypto';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MarketViewProps {
  cryptos: CryptoCurrency[];
  onBuyCrypto: (crypto: CryptoCurrency) => void;
}

const MarketView = ({ cryptos, onBuyCrypto }: MarketViewProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Mercado</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            Favoritos
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            PIX
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Mercado ETF
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {cryptos.map((crypto) => (
          <Card 
            key={crypto.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onBuyCrypto(crypto)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-crypto-blue rounded-full flex items-center justify-center text-white font-bold">
                  {crypto.icon}
                </div>
                <div>
                  <h4 className="font-medium">{crypto.symbol}/USDT</h4>
                  <p className="text-sm text-gray-500">{crypto.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div className={`flex items-center text-sm ${crypto.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {crypto.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span className="ml-1">{crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketView;
