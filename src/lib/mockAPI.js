let invoices = [
    { id: 1, client: "Acme Corp", amount: 2500, status: "Pending", dueDate: "2025-06-10", paymentMethod: "Credit Card" },
    { id: 2, client: "Beta Inc", amount: 1200, status: "Paid", dueDate: "2025-06-01", paymentMethod: "Bank Transfer" },
    { id: 3, client: "Gamma LLC", amount: 3400, status: "Pending", dueDate: "2025-06-15", paymentMethod: "PayPal" },
    { id: 4, client: "Delta Co", amount: 1800, status: "Overdue", dueDate: "2025-05-20", paymentMethod: "Cash" },
    { id: 5, client: "Epsilon Ltd", amount: 2200, status: "Pending", dueDate: "2025-06-25", paymentMethod: "Credit Card" },
    { id: 6, client: "Zeta Group", amount: 1500, status: "Paid", dueDate: "2025-05-30", paymentMethod: "Bank Transfer" },
    { id: 7, client: "Eta Solutions", amount: 2700, status: "Pending", dueDate: "2025-06-05", paymentMethod: "PayPal" },
    { id: 8, client: "Theta Partners", amount: 3100, status: "Overdue", dueDate: "2025-05-15", paymentMethod: "Cash" },
];

export const fetchInvoices = () =>
    new Promise((resolve) => setTimeout(() => resolve([...invoices]), 400));

export const markInvoicesAsPaid = (ids) =>
    new Promise((resolve) => {
        invoices = invoices.map((inv) =>
            ids.includes(inv.id) ? { ...inv, status: "Paid" } : inv
        );
        setTimeout(() => resolve(true), 400);
    });

export const deleteInvoices = (ids) =>
    new Promise((resolve) => {
        invoices = invoices.filter((inv) => !ids.includes(inv.id));
        setTimeout(() => resolve(true), 400);
    });
