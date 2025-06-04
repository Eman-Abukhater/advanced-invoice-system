import { Card, CardContent, Typography } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 19000 },
  { month: 'Mar', revenue: 8000 },
  { month: 'Apr', revenue: 15000 },
];

const MonthlyRevenueChart = () => (
  <Card sx={{ minWidth: 300 }}>
    <CardContent>
      <Typography variant="subtitle2" mb={2}>Monthly Revenue</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default MonthlyRevenueChart;
