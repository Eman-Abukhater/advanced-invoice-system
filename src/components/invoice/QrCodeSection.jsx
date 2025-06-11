'use client';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export default function QrCodeSection() {
  const { getValues } = useFormContext();
  const invoiceData = getValues();

  const invoiceText = JSON.stringify(invoiceData, null, 2);

  return (
    <Box mt={4}>
      <Typography variant="subtitle1" gutterBottom>
        Quick QR Access:
      </Typography>
      <QRCodeCanvas value={invoiceText} size={128} />
    </Box>
  );
}
