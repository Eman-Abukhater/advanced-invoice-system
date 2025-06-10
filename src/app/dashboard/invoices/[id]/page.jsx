"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchInvoices } from "@/lib/mockAPI";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import ActivityLog from "@/components/invoice/ActivityLog";
import StatusTracker from "@/components/invoice/StatusTracker";
import PrintButton from "@/components/invoice/PrintButton";
import dayjs from "dayjs"; 

import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Skeleton,
} from "@mui/material";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchInvoices().then((data) => {
      const found = data.find((inv) => inv.id === parseInt(id));

      if (found) {
        //  Add Overdue check logic
        const isPastDue =
          found.status === "Sent" &&
          found.dueDate &&
          dayjs().isAfter(dayjs(found.dueDate));

        if (isPastDue) {
          found.status = "Overdue";
        }

        setInvoice(found);
      }
    });
  }, [id]);

  if (!invoice) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Skeleton height={40} width="40%" />
        <Skeleton height={200} sx={{ my: 2 }} />
        <Skeleton height={150} />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        printColorAdjust: "exact",
        "@media print": {
          boxShadow: "none",
          padding: 0,
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Invoice #{invoice.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {invoice.dueDate}
          </Typography>
        </Box>
        <PrintButton />
      </Box>

      {/* Status Tracker */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <StatusTracker status={invoice.status} />
      </Paper>

      {/* Invoice Preview */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <InvoicePreview invoice={invoice} />
      </Paper>

      {/* Activity Log */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Activity Log
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ActivityLog invoice={invoice} />
      </Paper>
    </Container>
  );
}
