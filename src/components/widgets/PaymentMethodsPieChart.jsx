'use client';

import { Paper, Typography } from '@mui/material';

const PaymentMethodsPieChart = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Payment Methods</Typography>
      <Typography>Card: 40%</Typography>
      <Typography>Bank Transfer: 35%</Typography>
      <Typography>Cash: 25%</Typography>
    </Paper>
  );
};

export default PaymentMethodsPieChart;
