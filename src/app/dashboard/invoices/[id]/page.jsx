// pages/invoices/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchInvoices } from "@/mock/invoiceService";
import InvoicePreview from "@/components/InvoiceDetail/InvoicePreview";
import ActivityLog from "@/components/InvoiceDetail/ActivityLog";
import StatusTracker from "@/components/InvoiceDetail/StatusTracker";
import PrintButton from "@/components/InvoiceDetail/PrintButton";

export default function InvoiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
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
