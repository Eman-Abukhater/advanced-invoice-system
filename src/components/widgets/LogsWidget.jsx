import WidgetCard from './WidgetCard';
import HistoryIcon from '@mui/icons-material/History';

const LogsWidget = () => (
  <WidgetCard
    title="Access Logs"
    value="432 logs"
    icon={<HistoryIcon />}
    color="warning"
  />
);

export default LogsWidget;
