let invoices = [
    {
        id: 1,
        client: "Acme Corp",
        amount: 2500,
        status: "Draft", // Start as "Draft"
        dueDate: "2025-06-10",
        paymentMethod: "Credit Card",
        createdBy: "admin",
        createdAt: "2025-05-01T10:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T12:00:00Z",
        sentAt: "2025-06-03T09:00:00Z",
      },
    {
        id: 2,
        client: "Beta LLC",
        amount: 1500,
        status: "Paid", // Already paid
        dueDate: "2025-05-20",
        paymentMethod: "Bank Transfer",
        createdBy: "admin",
        createdAt: "2025-04-15T14:30:00Z",
        updatedBy: "admin",
        updatedAt: "2025-05-15T16:45:00Z",
        sentAt: "2025-05-01T11:00:00Z",
      },
    {
        id: 3,
        client: "Gamma Inc",
        amount: 3200,
        status: "Sent", // Sent but not paid
        dueDate: "2025-07-01",
        paymentMethod: "PayPal",
        createdBy: "admin",
        createdAt: "2025-05-10T08:20:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-05T10:15:00Z",
        sentAt: "2025-06-01T09:30:00Z",
      },
    {
        id: 4,
        client: "Delta Solutions",
        amount: 1800,
        status: "Draft", // Start as "Draft"
        dueDate: "2025-06-15",
        paymentMethod: "Credit Card",
        createdBy: "admin",
        createdAt: "2025-05-05T12:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T13:00:00Z",
        sentAt: null, // Not sent yet
      },
    {
        id: 5,
        client: "Epsilon Tech",
        amount: 2700,
        status: "Sent", // Sent but not paid
        dueDate: "2025-07-10",
        paymentMethod: "Bank Transfer",
        createdBy: "admin",
        createdAt: "2025-05-20T09:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T14:00:00Z",
        sentAt: "2025-06-02T10:00:00Z",
      },
    {
        id: 6,
        client: "Zeta Enterprises",
        amount: 2200,
        status: "Draft", // Start as "Draft"
        dueDate: "2025-06-30",
        paymentMethod: "PayPal",
        createdBy: "admin",
        createdAt: "2025-05-25T11:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T15:00:00Z",
        sentAt: null, // Not sent yet
      },
    {
        id: 7,
        client: "Eta Innovations",
        amount: 3000,
        status: "Paid", // Already paid
        dueDate: "2025-05-25",
        paymentMethod: "Credit Card",
        createdBy: "admin",
        createdAt: "2025-04-20T13:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-05-20T15:00:00Z",
        sentAt: "2025-05-01T12:00:00Z",
      },
    {
        id: 8,
        client: "Theta Group",
        amount: 4000,
        status: "Sent", // Sent but not paid
        dueDate: "2025-07-20",
        paymentMethod: "Bank Transfer",
        createdBy: "admin",
        createdAt: "2025-05-30T10:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T16:00:00Z",
        sentAt: "2025-06-03T11:00:00Z",
      },
    {
        id: 9,
        client: "Iota Services",
        amount: 1900,
        status: "Draft", // Start as "Draft"
        dueDate: "2025-06-20",
        paymentMethod: "PayPal",
        createdBy: "admin",
        createdAt: "2025-05-15T14:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T17:00:00Z",
        sentAt: null, // Not sent yet
      },
    {
        id: 10,
        client: "Kappa Solutions",
        amount: 3500,
        status: "Paid", // Already paid
        dueDate: "2025-05-30",
        paymentMethod: "Credit Card",
        createdBy: "admin",
        createdAt: "2025-04-25T12:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-05-25T13:00:00Z",
        sentAt: "2025-05-01T14:00:00Z",
      },
    {
        id: 11,
        client: "Lambda Industries",
        amount: 2800,
        status: "Sent", // Sent but not paid
        dueDate: "2025-07-05",
        paymentMethod: "Bank Transfer",
        createdBy: "admin",
        createdAt: "2025-05-12T09:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T18:00:00Z",
        sentAt: "2025-06-04T10:00:00Z",
      },
    {
        id: 12,
        client: "Mu Technologies",
        amount: 2300,
        status: "Draft", // Start as "Draft"
        dueDate: "2025-06-25",
        paymentMethod: "PayPal",
        createdBy: "admin",
        createdAt: "2025-05-18T11:00:00Z",
        updatedBy: "admin",
        updatedAt: "2025-06-01T19:00:00Z",
        sentAt: null, // Not sent yet
      },



    
    
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
