import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

const steps = ["Draft", "Sent", "Paid"];

export default function StatusTracker({ status }) {
  const activeStep = steps.includes(status) ? steps.indexOf(status) : 0;

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {status === "Overdue" && (
        <Typography color="error" mt={1} fontWeight="bold">Overdue</Typography>
      )}
    </Box>
  );
}
