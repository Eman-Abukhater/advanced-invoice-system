import WidgetCard from './WidgetCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const RevenueWidget = () => (
  <WidgetCard
    title="Total Revenue"
    value="$124,000"
    icon={<MonetizationOnIcon />}
    color="success"
  />
);

export default RevenueWidget;
