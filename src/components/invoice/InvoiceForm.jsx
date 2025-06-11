"use client";

import { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import ClientInfoStep from "./steps/ClientInfoStep";
import ItemsStep from "./steps/ItemsStep";
import PaymentStep from "./steps/PaymentStep";
import QrCodeSection from "./QrCodeSection";
import { useSession } from "next-auth/react";
import { createInvoice } from "@/lib/mockAPI";
const steps = ["Client Info", "Items", "Payment & Upload"];

const defaultValues = {
  clientInfo: {
    name: "",
    email: "",
    address: "",
  },
  items: [{ name: "", quantity: 1, price: 0 }],
  attachments: [],
  payment: {
    dueDate: "",
    method: "",
  },
  
};

const validationSchema = [
  Yup.object({
    clientInfo: Yup.object({
      name: Yup.string().required("Client name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
    }),
  }),
  Yup.object({
    items: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number().required().min(1, "Min 1"),
        price: Yup.number().required().min(0, "Min 0"),
      })
    ),
  }),
  Yup.object({
    payment: Yup.object({
      method: Yup.string().required("Please select method"),
    }),
    attachments: Yup.array().of(Yup.string().url()),
  }),
];

export default function InvoiceForm({ mode = "create", initialData = null }) {
  const [activeStep, setActiveStep] = useState(0);
  const printRef = useRef();

  const methods = useForm({
    defaultValues: initialData || defaultValues,
    resolver: yupResolver(validationSchema[activeStep]),
    mode: "onBlur",
  });

  const { trigger, getValues } = methods;
  const { data: session } = useSession();

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = async (action) => {
    const isValid = await trigger();
    if (!isValid) return;
  
    const data = getValues();
    const userName = session?.user?.name || "Unknown User";
  
    const items = data.items;
    const amount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  
    const newInvoice = {
      client: data.clientInfo?.name || "Unnamed Client",
      amount,
      status: action === "draft" ? "Draft" : "Sent",
      dueDate: data.payment?.dueDate || new Date().toISOString().split("T")[0],
      paymentMethod: data.payment?.method || "N/A",
      createdBy: userName,
      createdAt: new Date().toISOString(),
      updatedBy: userName,
      updatedAt: new Date().toISOString(),
      sentAt: action === "send" ? new Date().toISOString() : null,
    };
  
    try {
      await createInvoice(newInvoice);
      toast.success(`Invoice ${action === "draft" ? "saved as draft" : "sent"} successfully!`);
      methods.reset(defaultValues);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Something went wrong!");
    }
  };
  
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const data = getValues();
  
    const { name, email, address } = data.clientInfo;
    const items = data.items;
    const method = data.payment?.method || "";
    const today = new Date().toLocaleDateString();
  
    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);
  
    // Client Info
    doc.setFontSize(12);
    doc.text(`Date: ${today}`, 14, 30);
    doc.text(`Client Name: ${name}`, 14, 40);
    doc.text(`Email: ${email}`, 14, 47);
    doc.text(`Address: ${address}`, 14, 54);
  
    // Items Table
    autoTable(doc, {
      startY: 65,
      head: [["Item Name", "Quantity", "Price", "Total"]],
      body: items.map((item) => {
        const quantity = Number(item.quantity);
        const price = Number(item.price);
        const total = quantity * price;
  
        return [
          item.name,
          quantity,
          `$${price.toFixed(2)}`,
          `$${total.toFixed(2)}`,
        ];
      }),
    });
  
    const total = items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0
    );
  
    // Total & Terms
    const finalY = doc.lastAutoTable.finalY || 80;
    doc.text(`Payment Method: ${method}`, 14, finalY + 10);
    doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 20);
  
    doc.save("invoice.pdf");
    toast.success("PDF Downloaded Successfully");
  };
  

  return (
    <FormProvider {...methods}>
      <Box ref={printRef}>
        <ToastContainer position="top-right" autoClose={3000} />

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
        {activeStep === 2 && (
          <>
            <PaymentStep />
            <QrCodeSection />
          </>
        )}

        {/* Navigation Buttons */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFinalSubmit("draft")}
                sx={{ mr: 1 }}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleFinalSubmit("send")}
                sx={{ mr: 1 }}
              >
                Send Invoice
              </Button>
              <Button variant="outlined" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </FormProvider>
  );
}
