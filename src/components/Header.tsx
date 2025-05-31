
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
    <div className="bg-white p-4 border-b border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/ea1c571b-1b00-439e-9e97-1ca02061b83f.png" 
            alt="Guardian Wallet" 
            className="h-8 w-auto"
          />
        </div>
      </div>

      {/* User Info and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Bem Vindo</h1>
          <p className="text-sm text-gray-500">{userName}</p>
        </div>
        <div className="w-10 h-10 bg-crypto-blue rounded-full flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onReceive}
          className="flex-1 bg-crypto-blue text-white hover:bg-blue-700 rounded-2xl h-12"
        >
          <ArrowDown size={18} className="mr-2" />
          Receber
        </Button>
        <Button 
          onClick={onSend}
          className="flex-1 bg-gray-100 text-crypto-blue hover:bg-gray-200 rounded-2xl h-12"
        >
          <ArrowUp size={18} className="mr-2" />
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default Header;
