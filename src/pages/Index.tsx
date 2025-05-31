
import { useState } from 'react';
import { Home, Wallet, TrendingUp, User } from 'lucide-react';
import Header from '@/components/Header';
import CryptoList from '@/components/CryptoList';
import CryptoDetail from '@/components/CryptoDetail';
import TransactionHistory from '@/components/TransactionHistory';
import TransactionModal from '@/components/TransactionModal';
import SuccessModal from '@/components/SuccessModal';
import LoginForm from '@/components/LoginForm';
import { cryptoData, transactionHistory } from '@/data/cryptoData';
import { CryptoCurrency, Transaction } from '@/types/crypto';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', totalBalance: 56908.32 });
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [cryptos, setCryptos] = useState(cryptoData);
  const [transactions, setTransactions] = useState(transactionHistory);
  const [transactionModal, setTransactionModal] = useState<{
    isOpen: boolean;
    type: 'buy' | 'sell';
    crypto: CryptoCurrency | null;
  }>({ isOpen: false, type: 'buy', crypto: null });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    type: 'buy' | 'sell';
    crypto: string;
    amount: number;
  }>({ isOpen: false, type: 'buy', crypto: '', amount: 0 });

  const { toast } = useToast();

  const handleLogin = (email: string) => {
    setUser({ 
      name: email.split('@')[0], 
      email, 
      totalBalance: 56908.32 
    });
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo à sua carteira de criptomoedas.",
    });
  };

  const handleCryptoSelect = (crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto);
  };

  const handleBuy = (crypto: CryptoCurrency) => {
    setTransactionModal({ isOpen: true, type: 'buy', crypto });
  };

  const handleSell = (crypto: CryptoCurrency) => {
    setTransactionModal({ isOpen: true, type: 'sell', crypto });
  };

  const handleTransactionConfirm = (amount: number) => {
    if (!transactionModal.crypto) return;

    const crypto = transactionModal.crypto;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionModal.type,
      crypto: crypto.symbol,
      amount,
      price: crypto.price,
      total: amount * crypto.price,
      date: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);

    // Update crypto balance
    setCryptos(prevCryptos => 
      prevCryptos.map(c => 
        c.id === crypto.id 
          ? { 
              ...c, 
              balance: transactionModal.type === 'buy' 
                ? c.balance + amount 
                : c.balance - amount 
            }
          : c
      )
    );

    // Update user balance
    setUser(prevUser => ({
      ...prevUser,
      totalBalance: transactionModal.type === 'buy'
        ? prevUser.totalBalance - newTransaction.total
        : prevUser.totalBalance + newTransaction.total
    }));

    setSuccessModal({
      isOpen: true,
      type: transactionModal.type,
      crypto: crypto.symbol,
      amount
    });

    toast({
      title: `${transactionModal.type === 'buy' ? 'Compra' : 'Venda'} realizada!`,
      description: `${amount} ${crypto.symbol} ${transactionModal.type === 'buy' ? 'comprados' : 'vendidos'} com sucesso.`,
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (selectedCrypto) {
    return (
      <>
        <CryptoDetail
          crypto={selectedCrypto}
          onBack={() => setSelectedCrypto(null)}
          onBuy={handleBuy}
          onSell={handleSell}
        />
        <TransactionModal
          crypto={transactionModal.crypto!}
          type={transactionModal.type}
          isOpen={transactionModal.isOpen}
          onClose={() => setTransactionModal({ ...transactionModal, isOpen: false })}
          onConfirm={handleTransactionConfirm}
        />
        <SuccessModal
          isOpen={successModal.isOpen}
          type={successModal.type}
          crypto={successModal.crypto}
          amount={successModal.amount}
          onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {activeTab === 'home' && (
          <>
            <Header userName={user.name} totalBalance={user.totalBalance} />
            <CryptoList cryptos={cryptos} onCryptoSelect={handleCryptoSelect} />
          </>
        )}

        {activeTab === 'wallet' && (
          <>
            <div className="bg-crypto-blue text-white p-6">
              <h1 className="text-xl font-bold">Carteira</h1>
            </div>
            <CryptoList cryptos={cryptos} onCryptoSelect={handleCryptoSelect} />
          </>
        )}

        {activeTab === 'transactions' && (
          <>
            <div className="bg-crypto-blue text-white p-6">
              <h1 className="text-xl font-bold">Transações</h1>
            </div>
            <TransactionHistory transactions={transactions} />
          </>
        )}

        {activeTab === 'profile' && (
          <div className="p-6">
            <div className="bg-crypto-blue text-white p-6 rounded-2xl mb-6">
              <h1 className="text-xl font-bold">Perfil</h1>
              <p className="mt-2">Nome: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full p-4 bg-crypto-red text-white rounded-2xl"
            >
              Sair da conta
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
          <div className="flex justify-around py-2">
            {[
              { id: 'home', icon: Home, label: 'Início' },
              { id: 'wallet', icon: Wallet, label: 'Carteira' },
              { id: 'transactions', icon: TrendingUp, label: 'Transações' },
              { id: 'profile', icon: User, label: 'Perfil' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'text-crypto-blue bg-blue-50' 
                    : 'text-gray-500'
                }`}
              >
                <tab.icon size={20} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modals */}
        <TransactionModal
          crypto={transactionModal.crypto!}
          type={transactionModal.type}
          isOpen={transactionModal.isOpen && !!transactionModal.crypto}
          onClose={() => setTransactionModal({ ...transactionModal, isOpen: false })}
          onConfirm={handleTransactionConfirm}
        />

        <SuccessModal
          isOpen={successModal.isOpen}
          type={successModal.type}
          crypto={successModal.crypto}
          amount={successModal.amount}
          onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        />
      </div>
    </div>
  );
};

export default Index;
