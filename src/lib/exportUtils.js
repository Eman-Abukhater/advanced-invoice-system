import html2pdf from 'html2pdf.js';

export const exportInvoicesToCSV = (invoices) => {
  const csvContent = [
    ['Client', 'Amount', 'Status', 'Due Date', 'Payment Method'],
    ...invoices.map((inv) => [
      inv.client,
      inv.amount,
      inv.status,
      inv.dueDate,
      inv.paymentMethod,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'invoices.csv';
  link.click();
};

export const exportInvoicesToPDF = (invoices) => {
  const content = `
    <h2>Invoice List</h2>
    <table border="1" cellspacing="0" cellpadding="8">
      <thead>
        <tr>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        ${invoices
          .map(
            (inv) => `
            <tr>
              <td>${inv.client}</td>
              <td>$${inv.amount}</td>
              <td>${inv.status}</td>
              <td>${inv.dueDate}</td>
              <td>${inv.paymentMethod}</td>
            </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;

  const opt = {
    margin: 0.5,
    filename: 'invoices.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {},
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().from(content).set(opt).save();
};
