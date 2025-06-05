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

  const toggleAll = () =>
    setSelected((prev) =>
      prev.length === invoices.length ? [] : invoices.map((i) => i.id)
    );

  if (isLoading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Invoices
      </Typography>

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
                checked={selected.length === invoices.length}
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
          {invoices.map((inv) => (
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
