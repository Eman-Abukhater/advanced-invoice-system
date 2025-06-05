export const exportInvoicesToPDF = async (invoices) => {
  // Guard: run only in browser
  if (typeof window === 'undefined') return;

  // Dynamically import html2pdf only on the client side
  const html2pdf = (await import('html2pdf.js')).default;

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

  const element = document.createElement('div');
  element.innerHTML = content;

  const opt = {
    margin: 0.5,
    filename: 'invoices.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {},
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().from(element).set(opt).save();
};
