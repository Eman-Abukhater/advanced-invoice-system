'use client';

import { Card, CardContent } from '@mui/material';

export default function DashboardView({ user }) {
  const role = user?.role?.toLowerCase();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.name}</h1>
      <p style={{ marginBottom: '2rem' }}>Role: {role}</p>

      {role === 'admin' && (
        <div className="admin-dashboard">
          <Widget title="User Management" description="View, add, or remove users." />
          <Widget title="System Logs" description="Review system activity and logs." />
          <Widget title="Company Reports" description="Access full reports and statistics." />
        </div>
      )}

      {role === 'finance-manager' && (
        <div className="finance-dashboard">
          <Widget title="Financial Overview" description="Company-wide financial metrics." />
          <Widget title="Budget Planning" description="View and manage budget allocations." />
          <Widget title="Expense Approval" description="Approve or reject expenses." />
        </div>
      )}

      {role === 'accountant' && (
        <div className="accountant-dashboard">
          <Widget title="Invoices" description="Generate and track invoices." />
          <Widget title="Transactions" description="Manage incoming and outgoing payments." />
          <Widget title="Reconciliation" description="Match bank statements with company records." />
        </div>
      )}

      {role === 'viewer' && (
        <div className="viewer-dashboard">
          <Widget title="Company Summary" description="Read-only overview of key company data." />
          <Widget title="Reports" description="Access financial and performance reports." />
        </div>
      )}
    </div>
  );
}

function Widget({ title, description }) {
  return (
    <Card style={{ marginBottom: '1rem', maxWidth: 600 }}>
      <CardContent>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
