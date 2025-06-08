import { Box, Typography } from "@mui/material";
import { fetchInvoices } from "@/lib/mockAPI";

export default async function InvoiceDetailPage({ params }) {
  const { id } = params;
  const invoices = await fetchInvoices();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <Typography variant="h6">Invoice not found.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Invoice Detail - #{invoice.id}
      </Typography>
      <Typography><strong>Client:</strong> {invoice.client}</Typography>
      <Typography><strong>Amount:</strong> ${invoice.amount}</Typography>
      <Typography><strong>Status:</strong> {invoice.status}</Typography>
      <Typography><strong>Due Date:</strong> {invoice.dueDate}</Typography>
      <Typography><strong>Payment Method:</strong> {invoice.paymentMethod}</Typography>
    </Box>
  );
}
