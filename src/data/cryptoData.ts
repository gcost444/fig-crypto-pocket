
import { CryptoCurrency, Transaction } from '@/types/crypto';

export const cryptoData: CryptoCurrency[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 64382.64,
    change24h: 2.45,
    balance: 0.012,
    icon: '₿'
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 4143.82,
    change24h: -1.23,
    balance: 1.5,
    icon: 'Ξ'
  },
  {
    id: '3',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 207.3,
    change24h: 0.87,
    balance: 3.2,
    icon: 'Ł'
  },
  {
    id: '4',
    name: 'Solana',
    symbol: 'SOL',
    price: 227.94,
    change24h: 5.67,
    balance: 2.1,
    icon: '◎'
  },
  {
    id: '5',
    name: 'Binance',
    symbol: 'BNB',
    price: 610.5,
    change24h: -2.1,
    balance: 0.8,
    icon: '🔶'
  },
  {
    id: '6',
    name: 'XRP',
    symbol: 'XRP',
    price: 1.085,
    change24h: 3.2,
    balance: 1000,
    icon: '◉'
  }
];

export const transactionHistory: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    crypto: 'BTC',
    amount: 0.001,
    price: 64382.64,
    total: 64.38,
    date: '2024-05-31T10:30:00Z'
  },
  {
    id: '2',
    type: 'sell',
    crypto: 'ETH',
    amount: 0.5,
    price: 4143.82,
    total: 2071.91,
    date: '2024-05-30T15:45:00Z'
  },
  {
    id: '3',
    type: 'buy',
    crypto: 'SOL',
    amount: 2,
    price: 227.94,
    total: 455.88,
    date: '2024-05-29T09:15:00Z'
  }
];
