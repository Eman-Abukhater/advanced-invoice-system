import { Card, CardContent, Typography, Box } from '@mui/material';

const WidgetCard = ({ title, value, icon, color = 'primary', children }) => {
  return (
    <Card sx={{ minWidth: 240, backgroundColor: `${color}.main`, color: 'white', height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        {title && (
          <Typography variant="subtitle2" gutterBottom>
            {title}
          </Typography>
        )}
        {value && (
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        )}
        {icon && <Box mt={1}>{icon}</Box>}
        {children && <Box mt={2}>{children}</Box>}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
