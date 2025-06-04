'use client';

import { Paper, Typography } from '@mui/material';

const InvoiceBreakdownWidget = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Invoice Breakdown</Typography>
      <Typography>Paid: 25</Typography>
      <Typography>Overdue: 10</Typography>
      <Typography>Upcoming: 15</Typography>
    </Paper>
  );
};

export default InvoiceBreakdownWidget;
