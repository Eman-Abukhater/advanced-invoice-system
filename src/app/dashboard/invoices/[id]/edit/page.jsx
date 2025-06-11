"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchInvoices, updateInvoice } from "@/lib/mockAPI";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

const STATUS_OPTIONS = ["Draft", "Sent", "Paid", "Overdue"];
const PAYMENT_METHODS = ["Credit Card", "Bank Transfer", "PayPal"];

export default function InvoiceEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchInvoices()
      .then((data) => {
        const found = data.find((inv) => inv.id === parseInt(id));
        if (found) {
          setInvoice(found);
          setClient(found.client);
          setAmount(found.amount.toString());
          setDueDate(dayjs(found.dueDate).format("YYYY-MM-DD"));
          setStatus(found.status);
          setPaymentMethod(found.paymentMethod);
        } else {
          setError("Invoice not found");
        }
      })
      .catch(() => setError("Failed to load invoice"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const updated = await updateInvoice(parseInt(id), {
        client,
        amount: Number(amount),
        dueDate,
        status,
        paymentMethod,
        updatedBy: "admin", // or dynamic user if you have auth
      });
      setInvoice(updated);
      // Redirect back to detail page or show success message
      router.push(`/dashboard/invoices`);
    } catch (e) {
      setError(e.message || "Failed to update invoice");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ pt: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading invoice...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ pt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={3}>
          Edit Invoice #{invoice.id}
        </Typography>

        <TextField
          label="Client Name"
          fullWidth
          value={client}
          onChange={(e) => setClient(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Status"
          select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Payment Method"
          select
          fullWidth
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          margin="normal"
        >
          {PAYMENT_METHODS.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </TextField>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !client || !amount || !dueDate}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
