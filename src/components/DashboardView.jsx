'use client';

import { Box, Typography, Paper } from '@mui/material';

export default function DashboardView({ user }) {
  const role = user?.role;

  const getTitle = () => {
    switch (role) {
      case 'admin':
        return 'Welcome Admin - Full System Overview';
      case 'finance':
        return 'Welcome Finance Manager - Revenue & Invoices';
      case 'accountant':
        return 'Welcome Accountant - Invoice Control';
      case 'viewer':
        return 'Welcome Viewer - Read-Only Mode';
      default:
        return 'Welcome';
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {getTitle()}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          This is the starting point for the <strong>{role}</strong> dashboard.
          You can add widgets, analytics, charts, and action controls based on this role.
        </Typography>
      </Paper>
    </Box>
  );
}
