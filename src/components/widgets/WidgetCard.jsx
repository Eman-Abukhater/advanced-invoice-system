import { Card, CardContent, Typography } from '@mui/material';

const WidgetCard = ({ title, value, icon, color = 'primary', children }) => {
  return (
    <Card sx={{ minWidth: 240, backgroundColor: `${color}.main`, color: 'white', height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="subtitle2">{title}</Typography>
        {value && (
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        )}
        {icon && <div style={{ marginTop: '10px' }}>{icon}</div>}
        {children && <div style={{ marginTop: '16px' }}>{children}</div>}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
