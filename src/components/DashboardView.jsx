import RevenueWidget from './widgets/RevenueWidget';
import UsersWidget from './widgets/UsersWidget';
import LogsWidget from './widgets/LogsWidget';
import { Grid, Typography } from '@mui/material';

const DashboardView = ({ user }) => {
  const role = user?.role?.toLowerCase();

  if (role === 'admin') {
    return (
      <>
        <Typography variant="h4" mb={2}>Admin Dashboard</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}><RevenueWidget /></Grid>
          <Grid item xs={12} sm={6} md={4}><UsersWidget /></Grid>
          <Grid item xs={12} sm={6} md={4}><LogsWidget /></Grid>
        </Grid>
      </>
    );
  }

  return <Typography>Welcome, {user?.name}</Typography>;
};

export default DashboardView;
