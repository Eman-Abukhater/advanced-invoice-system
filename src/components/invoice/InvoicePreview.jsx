import { Box, Typography } from "@mui/material";

export default function InvoicePreview({ invoice }) {
  return (
    <Box>
      <Typography><strong>Client:</strong> {invoice.client}</Typography>
      <Typography><strong>Amount:</strong> ${invoice.amount}</Typography>
      <Typography><strong>Due Date:</strong> {invoice.dueDate}</Typography>
      <Typography><strong>Payment Method:</strong> {invoice.paymentMethod}</Typography>
    </Box>
  );
}
