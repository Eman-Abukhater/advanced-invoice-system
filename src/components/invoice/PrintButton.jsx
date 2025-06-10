import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

export default function PrintButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PrintIcon />}
      onClick={() => window.print()}
      sx={{ displayPrint: "none" , mb: 2, }}
    >
      Print
    </Button>
  );
}
