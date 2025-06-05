'use client';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

const mockInvoices = [
  {
    id: 1,
    client: 'Acme Corp',
    amount: 1200,
    dueDate: '2025-06-15',
    paymentMethod: 'Card',
    status: 'Paid',
  },
  {
    id: 2,
    client: 'Beta LLC',
    amount: 850,
    dueDate: '2025-06-10',
    paymentMethod: 'Bank Transfer',
    status: 'Overdue',
  },
  {
    id: 3,
    client: 'Delta Inc',
    amount: 450,
    dueDate: '2025-06-20',
    paymentMethod: 'Cash',
    status: 'Upcoming',
  },
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
  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Invoice Management
      </Typography>

      <Box mb={2}>
        <Button variant="contained" color="primary">+ Create Invoice</Button>
      </Box>

      <DataGrid
        rows={mockInvoices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />
    </Box>
  );
};

export default InvoiceTablePage;
