"use client";

import Image from "next/image";
import { Box, Container, Typography, Button, Grid, Stack } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={6}>
        
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Our Advanced Invoice System
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Streamline your invoicing process with ease. Track, manage, and get paid on time.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            href="/dashboard"
            size="large"
          >
            Get Started
          </Button>
        </Grid>
      
      </Grid>

      <Box mt={10} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          &copy; {new Date().getFullYear()} InvoiceMate. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
