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
  Link,
} from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PaymentStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

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
    formData.append('upload_preset', 'invoice'); // ✅ your preset

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dbjueuler/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setValue('attachments', [...attachments, data.secure_url], {
          shouldValidate: true,
        });
      } else {
        setUploadError('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setUploadError('An error occurred during upload.');
    }

    setUploading(false);
  };

  const handleRemove = (urlToRemove) => {
    const filtered = attachments.filter((url) => url !== urlToRemove);
    setValue('attachments', filtered, { shouldValidate: true });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Terms & Attachments
      </Typography>

      {/* Payment Terms */}
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

      {/* Upload Button */}
      <Box mt={3}>
        <Button
          component="label"
          variant="outlined"
          disabled={uploading}
          sx={{ textTransform: 'none' }}
        >
          {uploading ? <CircularProgress size={20} /> : 'Upload PDF/Image'}
          <input
            type="file"
            hidden
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </Button>
        {uploadError && (
          <Typography color="error" mt={1}>
            {uploadError}
          </Typography>
        )}
      </Box>

      {/* Uploaded Files */}
      {attachments.length > 0 && (
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {attachments.map((url) => {
            const filename = url.split('/').pop();
            const isPdf = url.includes('.pdf');

            return (
              <Chip
                key={url}
                label={
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {filename}
                  </Link>
                }
                onDelete={() => handleRemove(url)}
                color={isPdf ? 'default' : 'primary'}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
