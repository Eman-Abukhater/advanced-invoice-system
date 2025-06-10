"use client";

import { useParams } from "next/navigation"; // ✅ Fix: useParams instead of useRouter
import { useEffect, useState } from "react";
import { fetchInvoices } from "@/lib/mockAPI";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import ActivityLog from "@/components/invoice/ActivityLog";
import StatusTracker from "@/components/invoice/StatusTracker";
import PrintButton from "@/components/invoice/PrintButton";

export default function InvoiceDetailPage() {
  const params = useParams(); // ✅
  const id = params.id; // ✅ Extract `id` from params
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchInvoices().then((data) => {
      const found = data.find((inv) => inv.id === parseInt(id));
      setInvoice(found);
    });
  }, [id]);

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md print:shadow-none print:p-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoice #{invoice.id}</h1>
        <PrintButton />
      </div>

      <StatusTracker status={invoice.status} />
      <InvoicePreview invoice={invoice} />
      <ActivityLog invoice={invoice} />
    </div>
  );
}
