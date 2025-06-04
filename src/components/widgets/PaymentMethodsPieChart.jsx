'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const mockData = [
  { name: 'Card', value: 45 },
  { name: 'Bank Transfer', value: 30 },
  { name: 'Cash', value: 25 },
];

const COLORS = ['#1976d2', '#388e3c', '#f57c00'];

const PaymentMethodsPieChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Methods
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsPieChart;
