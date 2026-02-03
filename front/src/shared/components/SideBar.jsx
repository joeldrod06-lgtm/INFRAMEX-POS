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
  alpha,
  Avatar,
  Tooltip
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
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;
const collapsedDrawerWidth = 72;
const headerHeight = 64;

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

export default function SidebarVendedor({ children }) {
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const vendedorInfo = { 
    nombre: 'Joel Duran', 
    email: 'joel.duran@infamex.com',
    rol: 'Vendedor'
  };

  const handleDrawerToggle = () => {
    isMobile ? setMobileOpen(!mobileOpen) : setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const isItemActive = (itemPath) =>
    location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);

  const drawerContent = (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    }}>
      {/* Logo y Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          minHeight: headerHeight,
          background: 'white'
        }}
      >
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PointOfSaleIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                INFAMEX
              </Typography>
            </Box>
            <IconButton 
              onClick={handleDrawerToggle} 
              size="small"
              sx={{
                background: alpha('#3b82f6', 0.1),
                '&:hover': { background: alpha('#3b82f6', 0.2) }
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
            </IconButton>
          </>
        ) : (
          <Tooltip title="Abrir menú" placement="right">
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{
                background: alpha('#3b82f6', 0.1),
                '&:hover': { background: alpha('#3b82f6', 0.2) }
              }}
            >
              <MenuIcon sx={{ color: '#3b82f6' }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Menú de navegación */}
      <List sx={{ 
        flex: 1, 
        p: 1.5,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#000', 0.1),
          borderRadius: 2,
        },
      }}>
        {menuItems.map((item) => {
          const active = isItemActive(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={!open ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: 44,
                    borderRadius: 1.5,
                    px: 2,
                    py: 1,
                    mb: 0.5,
                    transition: 'all 0.2s ease',
                    background: active 
                      ? alpha('#3b82f6', 0.1) 
                      : 'transparent',
                    borderLeft: active 
                      ? `3px solid #3b82f6` 
                      : '3px solid transparent',
                    '&:hover': {
                      background: active 
                        ? alpha('#3b82f6', 0.15) 
                        : alpha('#64748b', 0.08),
                      transform: 'translateX(2px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 0, 
                    mr: open ? 2 : 'auto',
                    color: active ? '#3b82f6' : '#64748b'
                  }}>
                    {React.cloneElement(item.icon, {
                      sx: { fontSize: 22 }
                    })}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 500,
                        color: active ? '#1e293b' : '#475569'
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Perfil del vendedor */}
      <Box sx={{ 
        p: open ? 2 : 1.5, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: 'white'
      }}>
        {open ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                fontWeight: 600,
                fontSize: 14
              }}
            >
              {vendedorInfo.nombre.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} color="#1e293b">
                {vendedorInfo.nombre}
              </Typography>
              <Typography variant="caption" color="#64748b" display="block">
                {vendedorInfo.rol}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Tooltip title={`${vendedorInfo.nombre} - ${vendedorInfo.rol}`} placement="right">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                margin: '0 auto',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                fontWeight: 600,
                fontSize: 13
              }}
            >
              {vendedorInfo.nombre.split(' ').map(n => n[0]).join('')}
            </Avatar>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móvil
        }}
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            transition: theme.transitions.create(['width', 'transform'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Área principal */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0 // Previene desbordamiento
      }}>
        {/* Header */}
        <Box
          sx={{
            height: headerHeight,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            backdropFilter: 'blur(8px)',
            backgroundColor: alpha('#ffffff', 0.95)
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: '#64748b' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h6" 
              fontWeight="600" 
              color="#1e293b"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Sistema ERP INFAMEX
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              color="#64748b"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
        </Box>

        {/* Contenido */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            background: '#f8fafc',
            minHeight: 'calc(100vh - 64px)',
            
            /* Protección anti-rotura de layout mejorada */
            maxWidth: '100%',
            overflowX: 'hidden',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              maxWidth: '100%',
              minHeight: '100%',
              position: 'relative'
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}