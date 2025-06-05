"use client";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  fetchInvoices,
  markInvoicesAsPaid,
  deleteInvoices,
} from "@/lib/mockAPI";

// Importing utility functions for exporting invoices
import { exportInvoicesToCSV, exportInvoicesToPDF } from "@/lib/exportUtils";

const InvoicePage = () => {
  // State to manage filters
  const [filters, setFilters] = useState({
    client: "",
    minAmount: "",
    maxAmount: "",
    dueDateFrom: "",
    dueDateTo: "",
    paymentMethod: "",
    status: "",
  });

  const queryClient = useQueryClient();
  const [selected, setSelected] = useState([]);

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  const markAsPaid = useMutation({
    mutationFn: markInvoicesAsPaid,
    onSuccess: () => {
      toast.success("Invoices marked as paid");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      setSelected([]);
    },
  });

  const deleteInvs = useMutation({
    mutationFn: deleteInvoices,
    onSuccess: () => {
      toast.success("Invoices deleted");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      setSelected([]);
    },
  });

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAll = () => {
    const filteredIds = filteredInvoices.map((i) => i.id);
    const allSelected = filteredIds.every((id) => selected.includes(id));
    setSelected((prev) =>
      allSelected
        ? prev.filter((id) => !filteredIds.includes(id))
        : [...new Set([...prev, ...filteredIds])]
    );
  };

  if (isLoading) return <CircularProgress />;

  // Filter invoices based on the selected filters
  const filteredInvoices = invoices.filter((inv) => {
    const {
      client,
      minAmount,
      maxAmount,
      dueDateFrom,
      dueDateTo,
      paymentMethod,
      status,
    } = filters;

    const matchesClient =
      !client || inv.client.toLowerCase().includes(client.toLowerCase());

    const matchesMinAmount = !minAmount || inv.amount >= parseFloat(minAmount);

    const matchesMaxAmount = !maxAmount || inv.amount <= parseFloat(maxAmount);

    const matchesDueDateFrom =
      !dueDateFrom || new Date(inv.dueDate) >= new Date(dueDateFrom);

    const matchesDueDateTo =
      !dueDateTo || new Date(inv.dueDate) <= new Date(dueDateTo);

    const matchesPaymentMethod =
      !paymentMethod || inv.paymentMethod === paymentMethod;

    const matchesStatus = !status || inv.status === status;

    return (
      matchesClient &&
      matchesMinAmount &&
      matchesMaxAmount &&
      matchesDueDateFrom &&
      matchesDueDateTo &&
      matchesPaymentMethod &&
      matchesStatus
    );
  });

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Invoices
      </Typography>

      {/*  Filter Section */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Client"
            fullWidth
            value={filters.client}
            onChange={(e) => setFilters({ ...filters, client: e.target.value })}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Min Amount"
            type="number"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters({ ...filters, minAmount: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Max Amount"
            type="number"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters({ ...filters, maxAmount: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Due Date From"
            type="date"
            value={filters.dueDateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dueDateFrom: e.target.value })
            }
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            label="Due Date To"
            type="date"
            value={filters.dueDateTo}
            onChange={(e) =>
              setFilters({ ...filters, dueDateTo: e.target.value })
            }
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Payment Method"
            value={filters.paymentMethod}
            onChange={(e) =>
              setFilters({ ...filters, paymentMethod: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Sent">Sent</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => markAsPaid.mutate(selected)}
            disabled={selected.length === 0}
          >
            Mark as Paid
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteInvs.mutate(selected)}
            disabled={selected.length === 0}
          >
            Delete
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              const selectedInvoices = invoices.filter((i) =>
                selected.includes(i.id)
              );
              if (selectedInvoices.length === 0)
                return toast.warning("No invoices selected");
              exportInvoicesToCSV(selectedInvoices);
            }}
          >
            Export CSV
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              const selectedInvoices = invoices.filter((i) =>
                selected.includes(i.id)
              );
              if (selectedInvoices.length === 0)
                return toast.warning("No invoices selected");
              exportInvoicesToPDF(selectedInvoices);
            }}
          >
            Export PDF
          </Button>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  filteredInvoices.length > 0 &&
                  filteredInvoices.every((inv) => selected.includes(inv.id))
                }
                onChange={toggleAll}
              />
            </TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInvoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(inv.id)}
                  onChange={() => toggle(inv.id)}
                />
              </TableCell>
              <TableCell>{inv.client}</TableCell>
              <TableCell>${inv.amount}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>{inv.dueDate}</TableCell>
              <TableCell>{inv.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InvoicePage;
