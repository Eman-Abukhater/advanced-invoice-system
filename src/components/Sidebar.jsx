'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const drawerWidth = 250;

const Sidebar = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const role = session?.user?.role;

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    ...(role !== 'viewer' ? [{ label: 'Create Invoice', href: '/dashboard/create-invoice' }] : []),
    { label: 'Invoices', href: '/dashboard/invoices' },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Welcome, {session?.user?.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {links.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton component={Link} href={link.href}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <ThemeToggle />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => signOut({ callbackUrl: '/login' })}
          sx={{ mt: 2 }}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* AppBar only for small screens */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer for mobile */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Drawer for desktop
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
