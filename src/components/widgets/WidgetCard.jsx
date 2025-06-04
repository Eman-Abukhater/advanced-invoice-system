import { Card, CardContent, Typography } from '@mui/material';

const WidgetCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <Card sx={{ minWidth: 240, backgroundColor: `${color}.main`, color: 'white' }}>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
        <div style={{ marginTop: '10px' }}>{icon}</div>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
