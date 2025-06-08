export default function InvoiceDetails({ params }) {
    const { id } = params;
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
        <p className="text-lg">Invoice ID: {id}</p>
        {/* We'll add preview layout, status tracker, etc. here */}
      </div>
    );
  }
  