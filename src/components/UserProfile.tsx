
import { User, Mail, Wallet, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User as UserType, CryptoCurrency, Transaction } from '@/types/crypto';

interface UserProfileProps {
  user: UserType;
  cryptos: CryptoCurrency[];
  transactions: Transaction[];
  onLogout: () => void;
}

const UserProfile = ({ user, cryptos, transactions, onLogout }: UserProfileProps) => {
  const ownedCryptos = cryptos.filter(crypto => crypto.balance > 0);
  const totalInvested = transactions
    .filter(t => t.type === 'buy')
    .reduce((acc, t) => acc + t.total, 0);
  const totalSold = transactions
    .filter(t => t.type === 'sell')
    .reduce((acc, t) => acc + t.total, 0);
  const netInvestment = totalInvested - totalSold;

  const accountAge = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 pb-24">
      <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6 rounded-2xl mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm opacity-90">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Wallet size={16} />
              <span className="text-sm">Saldo Total</span>
            </div>
            <p className="text-lg font-bold">${user.totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp size={16} />
              <span className="text-sm">Criptos Possuídas</span>
            </div>
            <p className="text-lg font-bold">{ownedCryptos.length}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Mail size={16} className="mr-2" />
            Informações da Conta
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nome:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conta criada há:</span>
              <span className="font-medium">{accountAge} dias</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <TrendingUp size={16} className="mr-2" />
            Estatísticas de Investimento
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Investido:</span>
              <span className="font-medium text-crypto-red">${totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Vendido:</span>
              <span className="font-medium text-crypto-green">${totalSold.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Investimento Líquido:</span>
              <span className={`font-medium ${netInvestment >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                ${Math.abs(netInvestment).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Transações:</span>
              <span className="font-medium">{transactions.length}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-3">Portfolio</h3>
          {ownedCryptos.length > 0 ? (
            <div className="space-y-2">
              {ownedCryptos.map((crypto) => {
                const totalValue = crypto.balance * crypto.price;
                const portfolioPercentage = user.totalBalance > 0 ? (totalValue / user.totalBalance) * 100 : 0;
                
                return (
                  <div key={crypto.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{crypto.icon}</span>
                      <span className="font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{crypto.balance} {crypto.symbol}</p>
                      <p className="text-xs text-gray-500">{portfolioPercentage.toFixed(1)}% do portfolio</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma criptomoeda em carteira</p>
          )}
        </Card>
      </div>

      <Button
        onClick={onLogout}
        className="w-full mt-6 p-4 bg-crypto-red hover:bg-red-600 text-white rounded-2xl h-12"
      >
        Sair da conta
      </Button>
    </div>
  );
};

export default UserProfile;
