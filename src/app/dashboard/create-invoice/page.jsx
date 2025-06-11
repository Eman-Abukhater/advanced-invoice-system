import { Container, Typography } from '@mui/material';
import InvoiceForm from '@/components/invoice/InvoiceForm';

export default function CreateInvoicePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        Create New Invoice
      </Typography>
      <InvoiceForm />
    </Container>
  );
}
