import { Box, Typography } from "@mui/material";

export default function ActivityLog({ invoice }) {
  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>Activity Log</Typography>
      <Typography>Created by {invoice.createdBy} on {new Date(invoice.createdAt).toLocaleString()}</Typography>
      <Typography>Last edited by {invoice.updatedBy} on {new Date(invoice.updatedAt).toLocaleString()}</Typography>
      <Typography>Sent at: {invoice.sentAt ? new Date(invoice.sentAt).toLocaleString() : "Not sent yet"}</Typography>
    </Box>
  );
}
