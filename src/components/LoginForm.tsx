
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && (isLogin || name)) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-blue to-crypto-lightBlue flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-crypto-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            G
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Guardian Wallet</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Acesse sua carteira segura' : 'Crie sua carteira segura'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do usuário
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required={!isLogin}
                className="rounded-xl"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-crypto-blue hover:bg-blue-700 text-white rounded-xl h-12 text-lg font-medium"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? 'Não possui uma conta?' : 'Já tem uma conta?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-crypto-blue hover:text-blue-700 font-medium mt-1"
          >
            {isLogin ? 'Cadastre-se' : 'Fazer login'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Esqueceu sua senha?
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginForm;
