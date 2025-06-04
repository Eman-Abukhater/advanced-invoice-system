import WidgetCard from './WidgetCard';
import GroupIcon from '@mui/icons-material/Group';

const UsersWidget = () => (
  <WidgetCard
    title="Total Users"
    value="132"
    icon={<GroupIcon />}
    color="info"
  />
);

export default UsersWidget;
