"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import ClientInfoStep from "./steps/ClientInfoStep";
import ItemsStep from "./steps/ItemsStep";
import PaymentStep from './steps/PaymentStep'; 
const steps = ["Client Info", "Items", "Payment & Upload"];

const defaultValues = {
  clientInfo: {
    name: "",
    email: "",
    address: "",
  },
  items: [{ name: "", quantity: 1, price: 0 }],
  payment: {
    terms: "",
  },
  attachments: [],
};

const validationSchema = [
  //  Client Info
  Yup.object({
    clientInfo: Yup.object({
      name: Yup.string().required("Client name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
    }),
  }),
  // Step 2: Items
  Yup.object({
    items: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number().required().min(1, "Min 1"),
        price: Yup.number().required().min(0, "Min 0"),
      })
    ),
  }),
  // Step 3: Payment & Upload
  Yup.object({payment: Yup.object({
    terms: Yup.string().required('Please select terms'),
  }),
  attachments: Yup.array().of(Yup.string().url()),
  }),
];

export default function InvoiceForm({ mode = "create", initialData = null }) {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    defaultValues: initialData || defaultValues,
    resolver: yupResolver(validationSchema[activeStep]),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Final Invoice Data:", data);
  };

  const handleNext = async () => {
    const valid = await methods.trigger(); // validate current step
    if (!valid) return;

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      methods.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <FormProvider {...methods}>
      <Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}

        {activeStep === 0 && <ClientInfoStep />}
        {activeStep === 1 && <ItemsStep />}
        {activeStep === 2 && <PaymentStep />}

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
