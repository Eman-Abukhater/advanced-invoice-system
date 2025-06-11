'use client';

import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PaymentStep() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const attachments = watch('attachments') || [];

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'invoice');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dbjueuler/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setValue('attachments', [...attachments, data.secure_url]);
      } else {
        setUploadError('Upload failed. Please try again.');
      }
    } catch (err) {
      setUploadError('Upload error.');
    }

    setUploading(false);
  };

  const handleRemove = (urlToRemove) => {
    const filtered = attachments.filter((url) => url !== urlToRemove);
    setValue('attachments', filtered);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Terms & Attachments
      </Typography>

      <TextField
        select
        label="Payment Terms"
        fullWidth
        margin="normal"
        {...register('payment.terms')}
        error={!!errors.payment?.terms}
        helperText={errors.payment?.terms?.message}
      >
        {['Net 7', 'Net 15', 'Net 30'].map((term) => (
          <MenuItem key={term} value={term}>
            {term}
          </MenuItem>
        ))}
      </TextField>

      <Box mt={3}>
        <Button component="label" variant="outlined" disabled={uploading}>
          {uploading ? <CircularProgress size={20} /> : 'Upload PDF/Image'}
          <input type="file" hidden accept="image/*,application/pdf" onChange={handleFileChange} />
        </Button>
        {uploadError && <Typography color="error" mt={1}>{uploadError}</Typography>}
      </Box>

      {attachments.length > 0 && (
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {attachments.map((url) => (
            <Chip
              key={url}
              label={url.split('/').pop()}
              onDelete={() => handleRemove(url)}
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
