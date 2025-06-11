'use client';

import { useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

export default function ClientInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Client Name"
        {...register('clientInfo.name')}
        error={!!errors.clientInfo?.name}
        helperText={errors.clientInfo?.name?.message}
        fullWidth
      />

      <TextField
        label="Client Email"
        {...register('clientInfo.email')}
        error={!!errors.clientInfo?.email}
        helperText={errors.clientInfo?.email?.message}
        fullWidth
      />

      <TextField
        label="Client Address"
        {...register('clientInfo.address')}
        error={!!errors.clientInfo?.address}
        helperText={errors.clientInfo?.address?.message}
        fullWidth
      />
    </Box>
  );
}
