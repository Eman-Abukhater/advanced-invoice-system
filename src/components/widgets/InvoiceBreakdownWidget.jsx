'use client';

import { Card, CardContent, Typography, Grid } from '@mui/material';

const mockData = {
  paid: 24,
  overdue: 5,
  upcoming: 8,
};

const InvoiceBreakdownWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Invoice Breakdown
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default InvoiceBreakdownWidget;
