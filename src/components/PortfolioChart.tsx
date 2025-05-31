
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CryptoCurrency } from '@/types/crypto';

interface PortfolioChartProps {
  cryptos: CryptoCurrency[];
  totalBalance: number;
}

const PortfolioChart = ({ cryptos, totalBalance }: PortfolioChartProps) => {
  // Filtrar apenas criptos que o usuário possui
  const ownedCryptos = cryptos.filter(crypto => crypto.balance > 0);
  
  // Preparar dados para o gráfico
  const chartData = ownedCryptos.map(crypto => ({
    name: crypto.symbol,
    value: crypto.balance * crypto.price,
    percentage: ((crypto.balance * crypto.price) / totalBalance * 100).toFixed(1)
  }));

  // Cores para o gráfico
  const colors = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#EFF6FF'];

  if (totalBalance === 0) {
    return (
      <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6 rounded-3xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Portfólio Total</p>
            <h2 className="text-4xl font-bold">${totalBalance.toFixed(2)}</h2>
            <div className="flex items-center mt-2">
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                0.00%
              </span>
            </div>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center">
              <span className="text-xs opacity-75">Sem dados</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-crypto-blue to-crypto-lightBlue text-white p-6 rounded-3xl mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">Portfólio Total</p>
          <h2 className="text-4xl font-bold">${totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
          <div className="flex items-center mt-2">
            <span className="bg-green-500 bg-opacity-80 px-2 py-1 rounded-full text-xs">
              📈 +15.3%
            </span>
          </div>
        </div>
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Legenda do gráfico */}
      {chartData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs opacity-90">
                {item.name} {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioChart;
