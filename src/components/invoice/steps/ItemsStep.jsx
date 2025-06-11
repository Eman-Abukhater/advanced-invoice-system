'use client';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Box, TextField, IconButton, Grid, Typography, Divider } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export default function ItemsStep() {
  const { control, register, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  const calculateSubtotal = (item) =>
    (item.quantity || 0) * (item.price || 0);

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + calculateSubtotal(item), 0);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoice Items
      </Typography>

      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id} alignItems="center" mb={2}>
          <Grid item xs={4}>
            <TextField
              label="Item Name"
              {...register(`items.${index}.name`)}
              error={!!errors.items?.[index]?.name}
              helperText={errors.items?.[index]?.name?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Qty"
              {...register(`items.${index}.quantity`)}
              error={!!errors.items?.[index]?.quantity}
              helperText={errors.items?.[index]?.quantity?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Price"
              {...register(`items.${index}.price`)}
              error={!!errors.items?.[index]?.price}
              helperText={errors.items?.[index]?.price?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Typography>
              {calculateSubtotal(items[index]).toFixed(2)} JD
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => remove(index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Box mt={2}>
        <IconButton onClick={() => append({ name: '', quantity: 1, price: 0 })}>
          <Add /> <Typography ml={1}>Add Item</Typography>
        </IconButton>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" align="right">
        Total: {calculateTotal().toFixed(2)} JD
      </Typography>
    </Box>
  );
}
