
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CryptoCurrency } from '@/types/crypto';

interface MarketBuyModalProps {
  crypto: CryptoCurrency | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (cryptoId: string, amountUSD: number) => void;
}

const MarketBuyModal = ({ crypto, isOpen, onClose, onBuy }: MarketBuyModalProps) => {
  const [amountUSD, setAmountUSD] = useState('');
  const [amountCrypto, setAmountCrypto] = useState('');
  const [buyType, setBuyType] = useState('usd');

  if (!isOpen || !crypto) return null;

  const handleBuy = () => {
    let usdAmount: number;
    
    if (buyType === 'usd') {
      usdAmount = parseFloat(amountUSD);
    } else {
      usdAmount = parseFloat(amountCrypto) * crypto.price;
    }

    if (usdAmount > 0) {
      onBuy(crypto.id, usdAmount);
      setAmountUSD('');
      setAmountCrypto('');
      onClose();
    }
  };

  const cryptoAmount = buyType === 'usd' ? parseFloat(amountUSD || '0') / crypto.price : parseFloat(amountCrypto || '0');
  const usdValue = buyType === 'usd' ? parseFloat(amountUSD || '0') : parseFloat(amountCrypto || '0') * crypto.price;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6">
          <button 
            onClick={onClose}
            className="mb-4 text-white hover:text-gray-200 flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl font-bold">
              {crypto.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold">{crypto.symbol}/USDT</h1>
              <p className="opacity-90">{crypto.name}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold">${crypto.price.toLocaleString('pt-BR', { minimumFractionDigits: 4 })}</p>
            <p className={`text-sm ${crypto.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
            </p>
          </div>
        </div>

        <div className="p-4 -mt-6">
          <Card className="p-6 mb-4">
            <Tabs value={buyType} onValueChange={setBuyType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="usd">Por Dólar</TabsTrigger>
                <TabsTrigger value="crypto">Por Moeda</TabsTrigger>
              </TabsList>
              
              <TabsContent value="usd" className="space-y-4">
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
                  {amountUSD && (
                    <p className="text-sm text-gray-500 mt-1">
                      Você receberá: {cryptoAmount.toFixed(8)} {crypto.symbol}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="crypto" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade ({crypto.symbol})
                  </label>
                  <Input
                    type="number"
                    step="0.00000001"
                    value={amountCrypto}
                    onChange={(e) => setAmountCrypto(e.target.value)}
                    placeholder="0.00"
                    className="text-lg"
                  />
                  {amountCrypto && (
                    <p className="text-sm text-gray-500 mt-1">
                      Valor total: ${usdValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {(buyType === 'usd' ? amountUSD : amountCrypto) && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Você receberá:</span>
                  <span className="font-bold">{cryptoAmount.toFixed(8)} {crypto.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Valor total:</span>
                  <span className="font-bold">${usdValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleBuy}
              disabled={(!amountUSD && !amountCrypto) || (buyType === 'usd' ? parseFloat(amountUSD) <= 0 : parseFloat(amountCrypto) <= 0)}
              className="w-full mt-6 bg-crypto-green hover:bg-green-600 text-white rounded-2xl h-12"
            >
              Confirmar Transação
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketBuyModal;
