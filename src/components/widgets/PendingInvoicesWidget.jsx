import WidgetCard from './WidgetCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const PendingInvoicesWidget = () => (
  <WidgetCard
    title="Pending Invoices"
    value="23"
    icon={<ReceiptLongIcon />}
    color="warning"
  />
);

export default PendingInvoicesWidget;
