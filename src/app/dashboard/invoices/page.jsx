'use client';

import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';

const mockInvoices = [
  { id: 1, client: 'Acme Corp', amount: 1200, dueDate: '2025-06-15', paymentMethod: 'Card', status: 'Paid' },
  { id: 2, client: 'Beta LLC', amount: 850, dueDate: '2025-06-10', paymentMethod: 'Bank Transfer', status: 'Overdue' },
  { id: 3, client: 'Delta Inc', amount: 450, dueDate: '2025-06-20', paymentMethod: 'Cash', status: 'Upcoming' },
  { id: 4, client: 'Acme Corp', amount: 1600, dueDate: '2025-06-30', paymentMethod: 'Card', status: 'Upcoming' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'client', headerName: 'Client', flex: 1 },
  { field: 'amount', headerName: 'Amount ($)', type: 'number', flex: 1 },
  { field: 'dueDate', headerName: 'Due Date', flex: 1 },
  { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => {
      const colorMap = {
        Paid: 'green',
        Overdue: 'red',
        Upcoming: 'orange',
      };
      return (
        <span style={{ color: colorMap[params.value] || 'gray', fontWeight: 'bold' }}>
          {params.value}
        </span>
      );
    },
  },
];

const InvoiceTablePage = () => {
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesClient = invoice.client.toLowerCase().includes(clientFilter.toLowerCase());
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;
    const matchesMinAmount = minAmount ? invoice.amount >= parseFloat(minAmount) : true;
    const matchesMaxAmount = maxAmount ? invoice.amount <= parseFloat(maxAmount) : true;
    return matchesClient && matchesStatus && matchesMinAmount && matchesMaxAmount;
  });

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Invoice Management
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Filter by Client"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Min Amount"
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Max Amount"
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mb={2}>
        <Button variant="contained" color="primary">
          + Create Invoice
        </Button>
      </Box>

      <DataGrid
        rows={filteredInvoices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />
    </Box>
  );
};

export default InvoiceTablePage;
