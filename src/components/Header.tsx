
import { ArrowDown, ArrowUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userName: string;
  totalBalance: number;
  onReceive: () => void;
  onSend: () => void;
}

const Header = ({ userName, totalBalance, onReceive, onSend }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6 rounded-b-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-medium">Bem Vindo</h1>
          <p className="text-sm opacity-90">{userName}</p>
        </div>
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm opacity-90 mb-1">Saldo total</p>
        <h2 className="text-3xl font-bold">${totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onReceive}
          className="flex-1 bg-white text-crypto-blue hover:bg-gray-100 rounded-2xl h-12"
        >
          <ArrowDown size={18} className="mr-2" />
          Receber
        </Button>
        <Button 
          onClick={onSend}
          className="flex-1 bg-white bg-opacity-20 text-white hover:bg-opacity-30 rounded-2xl h-12"
        >
          <ArrowUp size={18} className="mr-2" />
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default Header;
