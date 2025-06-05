import { Typography, Grid } from '@mui/material';
import WidgetCard from './WidgetCard';

const mockData = {
  paid: 24,
  overdue: 5,
  upcoming: 8,
};

const InvoiceBreakdownWidget = () => {
  return (
    <WidgetCard title="Invoice Breakdown" >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body1" color="green">Paid</Typography>
          <Typography variant="h5">{mockData.paid}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" color="red">Overdue</Typography>
          <Typography variant="h5">{mockData.overdue}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" color="orange">Upcoming</Typography>
          <Typography variant="h5">{mockData.upcoming}</Typography>
        </Grid>
      </Grid>
    </WidgetCard>
  );
};

export default InvoiceBreakdownWidget;
