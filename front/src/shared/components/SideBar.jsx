import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;
const collapsedDrawerWidth = 70;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { text: 'Pedidos', icon: <LocalShippingIcon />, path: '/pedidos' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
  { text: 'Ventas', icon: <AttachMoneyIcon />, path: '/ventas' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header del Sidebar */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          height: 80
        }}
      >
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InventoryIcon sx={{ color: '#2563eb', fontSize: 32 }} />
              <Box>
                <Typography variant="h6" fontWeight="800" sx={{ color: '#111827' }}>
                  INFAMEX
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                  Sistema Comercial
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleDrawerToggle} size="small">
              <ChevronLeftIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Menú principal */}
      <List sx={{ flex: 1, p: open ? 2 : 1 }}>
        <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
          <ListItemButton
            onClick={() => handleNavigation('/prueba')}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: 2,
              backgroundColor: location.pathname === '/prueba' ? alpha('#2563eb', 0.1) : 'transparent',
              '&:hover': {
                backgroundColor: alpha('#2563eb', 0.08),
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: location.pathname === '/prueba' ? '#2563eb' : '#6b7280'
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Inicio"
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === '/prueba' ? 600 : 400,
                  color: location.pathname === '/prueba' ? '#2563eb' : '#111827'
                }}
              />
            )}
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 2, mx: open ? 2 : 1 }} />

        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 2,
                backgroundColor: location.pathname === item.path ? alpha('#2563eb', 0.1) : 'transparent',
                '&:hover': {
                  backgroundColor: alpha('#2563eb', 0.08),
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === item.path ? '#2563eb' : '#6b7280'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? '#2563eb' : '#111827'
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer del Sidebar */}
      <Box
        sx={{
          p: open ? 2 : 1,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            borderRadius: 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: '#6b7280'
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          {open && (
            <ListItemText
              primary="Ajustes"
              primaryTypographyProps={{
                fontSize: '0.95rem',
                color: '#111827'
              }}
            />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Drawer móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móvil
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            background: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedDrawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            background: '#ffffff',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
        open={open}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}