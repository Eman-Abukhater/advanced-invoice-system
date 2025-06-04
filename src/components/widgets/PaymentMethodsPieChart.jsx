import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WidgetCard from './WidgetCard';

const mockData = [
  { name: 'Card', value: 45 },
  { name: 'Bank Transfer', value: 30 },
  { name: 'Cash', value: 25 },
];

const COLORS = ['#1976d2', '#388e3c', '#f57c00'];

const PaymentMethodsPieChart = () => {
  return (
    <WidgetCard title="Payment Methods" color="grey">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={mockData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
            {mockData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
};

export default PaymentMethodsPieChart;
