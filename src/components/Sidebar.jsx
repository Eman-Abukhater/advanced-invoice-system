'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Create Invoice', href: '/dashboard/create-invoice'},
    { label: 'Invoices', href: '/dashboard/invoices' },
  ];

  return (
    <Box sx={{ width: 250, bgcolor: '#f0f0f0', height: '100vh', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Welcome, {session?.user?.name}
      </Typography>
      <List>
        {links.map((link) => (
          <ListItem button component={Link} href={link.href} key={link.href}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => signOut({ callbackUrl: '/login' })}
        sx={{ mt: 4 }}
        fullWidth
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
