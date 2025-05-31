
export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  balance: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  crypto: string;
  amount: number;
  price: number;
  total: number;
  date: string;
}

export interface User {
  name: string;
  email: string;
  totalBalance: number;
}
