
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Transaction } from '@/types/crypto';
import { Card } from '@/components/ui/card';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Histórico de Transações</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'buy' ? 'bg-crypto-green' : 'bg-crypto-red'
                }`}>
                  {transaction.type === 'buy' ? 
                    <ArrowDown size={20} className="text-white" /> : 
                    <ArrowUp size={20} className="text-white" />
                  }
                </div>
                <div>
                  <h4 className="font-medium">
                    {transaction.type === 'buy' ? 'Compra' : 'Venda'} de {transaction.crypto}
                  </h4>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${transaction.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500">{transaction.amount} {transaction.crypto}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
