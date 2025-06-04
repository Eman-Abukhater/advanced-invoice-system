'use client';

import { Grid, Typography, CircularProgress } from '@mui/material';
import RevenueWidget from './widgets/RevenueWidget';
import UsersWidget from './widgets/UsersWidget';
import LogsWidget from './widgets/LogsWidget';
import PendingInvoicesWidget from './widgets/PendingInvoicesWidget';
import MonthlyRevenueChart from './widgets/MonthlyRevenueChart';
import InvoiceBreakdownWidget from './widgets/InvoiceBreakdownWidget';
import PaymentMethodsPieChart from './widgets/PaymentMethodsPieChart';

const DashboardView = ({ user }) => {
  const role = user?.role?.toLowerCase();

  if (!role) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" mb={2}>
        {user?.role} Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* === Admin Dashboard === */}
        {role === 'admin' && (
          <>
            <Grid item xs={12} sm={6} md={4}><RevenueWidget /></Grid>
            <Grid item xs={12} sm={6} md={4}><UsersWidget /></Grid>
            <Grid item xs={12} sm={6} md={4}><LogsWidget /></Grid>
            <Grid item xs={12} sm={6}><InvoiceBreakdownWidget /></Grid>
            <Grid item xs={12} sm={6}><PaymentMethodsPieChart /></Grid>
          </>
        )}

        {/* === Finance Manager Dashboard === */}
        {role === 'finance-manager' && (
          <>
            <Grid item xs={12} sm={6}><PendingInvoicesWidget /></Grid>
            <Grid item xs={12} sm={6}><MonthlyRevenueChart /></Grid>
            <Grid item xs={12} sm={6}><InvoiceBreakdownWidget /></Grid>
            <Grid item xs={12} sm={6}><PaymentMethodsPieChart /></Grid>
          </>
        )}

        {/* === Accountant Dashboard === */}
        {role === 'accountant' && (
          <>
            <Grid item xs={12} sm={6}><PendingInvoicesWidget /></Grid>
            <Grid item xs={12} sm={6}><InvoiceBreakdownWidget /></Grid>
          </>
        )}

        {/* === Viewer Dashboard === */}
        {role === 'viewer' && (
          <>
            <Grid item xs={12} sm={6}><MonthlyRevenueChart /></Grid>
            <Grid item xs={12} sm={6}><PaymentMethodsPieChart /></Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default DashboardView;
