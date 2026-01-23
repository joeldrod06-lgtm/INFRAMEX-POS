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
  PointOfSale as PointOfSaleIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Task as TaskIcon,
  CreditCard as CreditCardIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;
const collapsedDrawerWidth = 70;

// Menú simplificado para vendedor
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Punto de Venta', icon: <PointOfSaleIcon />, path: '/pos' },
  { text: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { text: 'Ventas', icon: <AttachMoneyIcon />, path: '/ventas' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
  { text: 'Mis Tareas', icon: <TaskIcon />, path: '/tareas' },
  { text: 'Mis Comisiones', icon: <CreditCardIcon />, path: '/comisiones' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
];

export default function SidebarVendedor() {
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Datos básicos del vendedor
  const vendedorInfo = {
    nombre: 'Joel Duran',
    iniciales: 'JD'
  };

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

  const isItemActive = (itemPath) => {
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#ffffff'
    }}>
      {/* Header minimalista */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          borderBottom: `1px solid ${alpha('#e5e7eb', 0.5)}`,
          minHeight: 64
        }}
      >
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PointOfSaleIcon sx={{ color: '#2563eb', fontSize: 28 }} />
              <Typography variant="h6" fontWeight="600" sx={{ color: '#111827' }}>
                INFAMEX
              </Typography>
            </Box>
            <IconButton 
              onClick={handleDrawerToggle} 
              size="small"
              sx={{ 
                border: `1px solid ${alpha('#e5e7eb', 0.8)}`,
                '&:hover': {
                  background: '#f9fafb'
                }
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Menú principal - Simple */}
      <List sx={{ flex: 1, p: 1 }}>
        {/* Enlace a Inicio */}
        <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
          <ListItemButton
            onClick={() => handleNavigation('/')}
            sx={{
              minHeight: 44,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              borderRadius: 1,
              backgroundColor: location.pathname === '/' ? alpha('#2563eb', 0.08) : 'transparent',
              '&:hover': {
                backgroundColor: alpha('#2563eb', 0.04),
              }
            }}
          >
            
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1.5, mx: open ? 2 : 1 }} />

        {/* Items del menú */}
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                minHeight: 44,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
                borderRadius: 1,
                backgroundColor: isItemActive(item.path) ? alpha('#2563eb', 0.08) : 'transparent',
                '&:hover': {
                  backgroundColor: alpha('#2563eb', 0.04),
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isItemActive(item.path) ? '#2563eb' : '#6b7280'
                }}
              >
                {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isItemActive(item.path) ? 500 : 400,
                    color: isItemActive(item.path) ? '#2563eb' : '#374151'
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Perfil simple */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha('#e5e7eb', 0.5)}`,
          background: '#f9fafb'
        }}
      >
        {open ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              sx={{ 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              {vendedorInfo.iniciales}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                {vendedorInfo.nombre}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Vendedor
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box 
            sx={{ 
              width: 36, 
              height: 36, 
              borderRadius: '50%', 
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              margin: '0 auto'
            }}
          >
            {vendedorInfo.iniciales}
          </Box>
        )}
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
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            background: '#ffffff',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
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
            boxShadow: '1px 0 4px rgba(0, 0, 0, 0.05)',
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