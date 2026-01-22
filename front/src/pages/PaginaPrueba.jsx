import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../shared/components/SideBar';

export default function PaginaPrueba() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#f8fafc'
        }}
      >
        {/* AppBar superior */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: '#ffffff',
            borderBottom: `1px solid ${alpha('#e5e7eb', 0.8)}`,
            color: '#111827'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigate('/')} size="small">
                <ArrowBackIcon sx={{ color: '#6b7280' }} />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ color: '#111827' }}>
                Página de Prueba
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" size="large">
                <NotificationsIcon sx={{ color: '#6b7280' }} />
              </IconButton>
              <IconButton color="inherit" size="large">
                <AccountCircleIcon sx={{ color: '#2563eb' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Contenido de la página */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Box
            sx={{
              background: '#ffffff',
              borderRadius: 2,
              p: 4,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              border: `1px solid ${alpha('#e5e7eb', 0.8)}`
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ color: '#111827', fontWeight: 600 }}>
              Bienvenido al Sistema INFAMEX
            </Typography>
            
            <Typography paragraph sx={{ color: '#6b7280', lineHeight: 1.7 }}>
              Esta es una página de demostración que muestra la integración del sidebar con el layout principal.
              El sidebar es completamente responsivo y se adapta a diferentes tamaños de pantalla.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#111827' }}>
                Características del Sidebar:
              </Typography>
              <Box component="ul" sx={{ color: '#6b7280', pl: 2 }}>
                <li>Diseño responsivo (colapsa en móviles)</li>
                <li>Animaciones suaves</li>
                <li>Estado activo para la ruta actual</li>
                <li>Modo expandido/colapsado en desktop</li>
                <li>Integración con Material-UI</li>
              </Box>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  background: '#2563eb',
                  '&:hover': { background: '#1d4ed8' }
                }}
              >
                Volver al Login
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => alert('Acción de prueba')}
                sx={{
                  borderColor: '#e5e7eb',
                  color: '#111827',
                  '&:hover': { borderColor: '#d1d5db' }
                }}
              >
                Acción de Prueba
              </Button>
            </Box>
          </Box>

          {/* Tarjetas de ejemplo */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mt: 4 }}>
            {[
              { title: 'Dashboard', description: 'Vista general del sistema' },
              { title: 'Productos', description: 'Gestión de inventario' },
              { title: 'Ventas', description: 'Reportes y análisis' },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  background: '#ffffff',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${alpha('#e5e7eb', 0.8)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                <Typography variant="h6" sx={{ color: '#111827', mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  {card.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#ffffff',
            borderTop: `1px solid ${alpha('#e5e7eb', 0.8)}`
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2026 INFAMEX S.L.U. - Sistema de Gestión Comercial
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}