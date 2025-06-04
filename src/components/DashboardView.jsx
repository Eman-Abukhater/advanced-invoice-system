import RevenueWidget from './widgets/RevenueWidget';
import UsersWidget from './widgets/UsersWidget';
import LogsWidget from './widgets/LogsWidget';
import MonthlyRevenueChart from './widgets/MonthlyRevenueChart';
import PendingInvoicesWidget from './widgets/PendingInvoicesWidget';
import InvoiceBreakdownWidget from './widgets/InvoiceBreakdownWidget';
import PaymentMethodsPieChart from './widgets/PaymentMethodsPieChart';

import { Grid, Typography } from '@mui/material';

const DashboardView = ({ user }) => {
  const role = user?.role?.toLowerCase();

  return (
    <>
      <Typography variant="h4" mb={2}>
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Admin Widgets */}
        {role === 'admin' && (
          <>
            <Grid item xs={12} sm={6} md={4}><RevenueWidget /></Grid>
            <Grid item xs={12} sm={6} md={4}><UsersWidget /></Grid>
            <Grid item xs={12} sm={6} md={4}><LogsWidget /></Grid>
          </>
        )}

        {/* Finance Manager Widgets */}
        {role === 'finance-manager' && (
          <>
            <Grid item xs={12} sm={6}><PendingInvoicesWidget /></Grid>
            <Grid item xs={12} sm={6}><MonthlyRevenueChart /></Grid>
          </>
        )}

        {/* Accountant Widgets */}
        {role === 'accountant' && (
          <>
            <Grid item xs={12} sm={6}><InvoiceBreakdownWidget /></Grid>
            <Grid item xs={12} sm={6}><PaymentMethodsPieChart /></Grid>
          </>
        )}

        {/* Viewer Widgets */}
        {role === 'viewer' && (
          <>
            <Grid item xs={12}><MonthlyRevenueChart /></Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default DashboardView;
