
import { useState } from 'react';
import { Home, Wallet, TrendingUp, User } from 'lucide-react';
import Header from '@/components/Header';
import CryptoList from '@/components/CryptoList';
import CryptoDetail from '@/components/CryptoDetail';
import TransactionHistory from '@/components/TransactionHistory';
import TransactionModal from '@/components/TransactionModal';
import SuccessModal from '@/components/SuccessModal';
import BuyModal from '@/components/BuyModal';
import SendModal from '@/components/SendModal';
import UserProfile from '@/components/UserProfile';
import LoginForm from '@/components/LoginForm';
import { cryptoData, transactionHistory } from '@/data/cryptoData';
import { CryptoCurrency, Transaction } from '@/types/crypto';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', totalBalance: 0 });
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [cryptos, setCryptos] = useState(() => 
    cryptoData.map(crypto => ({ ...crypto, balance: 0 }))
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
  const [buyModal, setBuyModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);

  const { toast } = useToast();

  const handleLogin = (email: string) => {
    setUser({ 
      name: email.split('@')[0], 
      email, 
      totalBalance: 0 
    });
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo à sua carteira de criptomoedas.",
    });
  };

  const handleBuyCrypto = (cryptoId: string, amountUSD: number) => {
    const crypto = cryptoData.find(c => c.id === cryptoId);
    if (!crypto) return;

    const cryptoAmount = amountUSD / crypto.price;
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'buy',
      crypto: crypto.symbol,
      amount: cryptoAmount,
      price: crypto.price,
      total: amountUSD,
      date: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);

    // Atualizar saldo da cripto
    setCryptos(prevCryptos => 
      prevCryptos.map(c => 
        c.id === cryptoId 
          ? { ...c, balance: c.balance + cryptoAmount }
          : c
      )
    );

    // Atualizar saldo total do usuário
    setUser(prevUser => ({
      ...prevUser,
      totalBalance: prevUser.totalBalance + amountUSD
    }));

    setSuccessModal({
      isOpen: true,
      type: 'buy',
      crypto: crypto.symbol,
      amount: cryptoAmount
    });

    toast({
      title: "Compra realizada!",
      description: `${cryptoAmount.toFixed(8)} ${crypto.symbol} comprados com sucesso.`,
    });
  };

  const handleSendCrypto = (cryptoId: string, amount: number, address: string) => {
    const crypto = cryptos.find(c => c.id === cryptoId);
    if (!crypto || crypto.balance < amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'sell',
      crypto: crypto.symbol,
      amount,
      price: crypto.price,
      total: amount * crypto.price,
      date: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);

    // Atualizar saldo da cripto
    setCryptos(prevCryptos => 
      prevCryptos.map(c => 
        c.id === cryptoId 
          ? { ...c, balance: c.balance - amount }
          : c
      )
    );

    // Atualizar saldo total do usuário (remove o valor vendido)
    setUser(prevUser => ({
      ...prevUser,
      totalBalance: prevUser.totalBalance - (amount * crypto.price)
    }));

    toast({
      title: "Envio realizado!",
      description: `${amount} ${crypto.symbol} enviados para ${address.substring(0, 10)}...`,
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
        ? prevUser.totalBalance + newTransaction.total
        : prevUser.totalBalance - newTransaction.total
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
            <Header 
              userName={user.name} 
              totalBalance={user.totalBalance}
              onReceive={() => setBuyModal(true)}
              onSend={() => setSendModal(true)}
            />
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
          <UserProfile 
            user={user}
            cryptos={cryptos}
            transactions={transactions}
            onLogout={() => setIsLoggedIn(false)}
          />
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
        <BuyModal
          isOpen={buyModal}
          onClose={() => setBuyModal(false)}
          onBuy={handleBuyCrypto}
        />

        <SendModal
          isOpen={sendModal}
          onClose={() => setSendModal(false)}
          userCryptos={cryptos}
          onSend={handleSendCrypto}
        />

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
