import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Badge,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Person,
  Phone,
  Email,
  LocationOn,
  CalendarMonth,
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  MoreVert,
  Add,
  Chat,
  Receipt,
  Assignment,
  Star,
  StarBorder,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos mock de clientes
const clientesMock = [
  {
    id: 1,
    nombre: 'Constructora Progreso S.A.',
    contacto: 'Juan Martínez',
    telefono: '+52 55 1234 5678',
    email: 'juan@constructoraprogreso.com',
    ubicacion: 'CDMX, México',
    ultimaCompra: '2024-12-15',
    totalCompras: 1250000,
    estado: 'activo',
    prioridad: 'alta',
    comprasUltimoMes: 3,
    calificacion: 4.8,
    etiquetas: ['corporativo', 'frecuente', 'preferente'],
  },
  {
    id: 2,
    nombre: 'Electricidad Moderna',
    contacto: 'María González',
    telefono: '+52 55 8765 4321',
    email: 'maria@electricidadmoderna.com',
    ubicacion: 'Guadalajara, Jalisco',
    ultimaCompra: '2024-12-14',
    totalCompras: 850000,
    estado: 'activo',
    prioridad: 'media',
    comprasUltimoMes: 2,
    calificacion: 4.5,
    etiquetas: ['eléctrico', 'frecuente'],
  },
  {
    id: 3,
    nombre: 'Arquitectura & Diseño',
    contacto: 'Carlos Rodríguez',
    telefono: '+52 55 2468 1357',
    email: 'carlos@arquitecturadiseno.com',
    ubicacion: 'Monterrey, NL',
    ultimaCompra: '2024-12-13',
    totalCompras: 420000,
    estado: 'pendiente',
    prioridad: 'alta',
    comprasUltimoMes: 1,
    calificacion: 4.2,
    etiquetas: ['arquitectura', 'nuevo'],
  },
  {
    id: 4,
    nombre: 'Hogar Feliz',
    contacto: 'Ana López',
    telefono: '+52 55 1357 2468',
    email: 'ana@hogarfeliz.com',
    ubicacion: 'Puebla, Puebla',
    ultimaCompra: '2024-12-12',
    totalCompras: 185000,
    estado: 'activo',
    prioridad: 'baja',
    comprasUltimoMes: 1,
    calificacion: 4.0,
    etiquetas: ['hogar', 'residencial'],
  },
  {
    id: 5,
    nombre: 'Ingeniería Civil S.A.',
    contacto: 'Roberto Sánchez',
    telefono: '+52 55 9876 5432',
    email: 'roberto@ingenieriacivil.com',
    ubicacion: 'Querétaro, Qro',
    ultimaCompra: '2024-12-11',
    totalCompras: 960000,
    estado: 'activo',
    prioridad: 'alta',
    comprasUltimoMes: 4,
    calificacion: 4.9,
    etiquetas: ['corporativo', 'ingeniería', 'frecuente'],
  },
  {
    id: 6,
    nombre: 'Decoraciones Lux',
    contacto: 'Laura Ramírez',
    telefono: '+52 55 3698 1472',
    email: 'laura@decoracioneslux.com',
    ubicacion: 'Cancún, QR',
    ultimaCompra: '2024-12-10',
    totalCompras: 320000,
    estado: 'inactivo',
    prioridad: 'media',
    comprasUltimoMes: 0,
    calificacion: 3.8,
    etiquetas: ['decoración', 'lujo'],
  },
];

// Componente de tarjeta de cliente
const ClienteCard = ({ cliente, onAction }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'activo': return '#10b981';
      case 'pendiente': return '#f59e0b';
      case 'inactivo': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const calcularDiasDesdeUltimaCompra = () => {
    const hoy = new Date();
    const ultima = new Date(cliente.ultimaCompra);
    const diffTime = hoy - ultima;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const diasDesdeCompra = calcularDiasDesdeUltimaCompra();

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        height: '100%',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Header con avatar y acciones */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: '#3b82f6', width: 40, height: 40 }}>
              {cliente.nombre.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="#111827">
                {cliente.nombre}
              </Typography>
              <Typography variant="caption" color="#6b7280">
                {cliente.contacto}
              </Typography>
            </Box>
          </Stack>
          
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ color: '#6b7280' }}
          >
            <MoreVert fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
            PaperProps={{
              sx: {
                borderRadius: '12px',
                minWidth: 160,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
              }
            }}
          >
            <MenuItem onClick={() => { onAction('contactar', cliente); handleMenuClose(); }}>
              <ListItemIcon>
                <Chat fontSize="small" />
              </ListItemIcon>
              Contactar
            </MenuItem>
            <MenuItem onClick={() => { onAction('cotizar', cliente); handleMenuClose(); }}>
              <ListItemIcon>
                <Receipt fontSize="small" />
              </ListItemIcon>
              Crear cotización
            </MenuItem>
            <MenuItem onClick={() => { onAction('seguimiento', cliente); handleMenuClose(); }}>
              <ListItemIcon>
                <Assignment fontSize="small" />
              </ListItemIcon>
              Agendar seguimiento
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onAction('favorito', cliente); handleMenuClose(); }}>
              <ListItemIcon>
                <Star fontSize="small" />
              </ListItemIcon>
              Marcar favorito
            </MenuItem>
          </Menu>
        </Stack>

        {/* Información de contacto */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Phone sx={{ fontSize: 16, color: '#6b7280' }} />
            <Typography variant="caption" color="#111827">
              {cliente.telefono}
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <Email sx={{ fontSize: 16, color: '#6b7280' }} />
            <Typography variant="caption" color="#111827" sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {cliente.email}
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOn sx={{ fontSize: 16, color: '#6b7280' }} />
            <Typography variant="caption" color="#111827">
              {cliente.ubicacion}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* Métricas rápidas */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Stack alignItems="center">
              <Typography variant="caption" color="#6b7280">
                Total Compras
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#111827">
                ${(cliente.totalCompras / 1000).toFixed(0)}K
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack alignItems="center">
              <Typography variant="caption" color="#6b7280">
                Última Compra
              </Typography>
              <Typography variant="body2" fontWeight={600} color={diasDesdeCompra > 30 ? '#ef4444' : '#111827'}>
                {diasDesdeCompra}d
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Estado y prioridad */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5}>
            <Chip
              label={cliente.estado.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: getEstadoColor(cliente.estado) + '20',
                color: getEstadoColor(cliente.estado),
                fontSize: '0.65rem',
                height: '20px',
              }}
            />
            <Chip
              label={cliente.prioridad.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: getPrioridadColor(cliente.prioridad) + '20',
                color: getPrioridadColor(cliente.prioridad),
                fontSize: '0.65rem',
                height: '20px',
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                sx={{
                  fontSize: 14,
                  color: index < Math.floor(cliente.calificacion) ? '#f59e0b' : '#d1d5db',
                }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Etiquetas */}
        {cliente.etiquetas.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            {cliente.etiquetas.slice(0, 2).map((etiqueta, index) => (
              <Chip
                key={index}
                label={etiqueta}
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: '20px',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                }}
              />
            ))}
            {cliente.etiquetas.length > 2 && (
              <Chip
                label={`+${cliente.etiquetas.length - 2}`}
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: '20px',
                  backgroundColor: '#e5e7eb',
                  color: '#6b7280',
                }}
              />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

// Resumen de clientes
const ResumenClientes = ({ clientes }) => {
  const activos = clientes.filter(c => c.estado === 'activo').length;
  const totalCompras = clientes.reduce((sum, c) => sum + c.totalCompras, 0);
  const promedioCalificacion = (clientes.reduce((sum, c) => sum + c.calificacion, 0) / clientes.length).toFixed(1);

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <Person sx={{ color: '#059669' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Clientes
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#111827">
                {clientes.length}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
              <CheckCircle sx={{ color: '#3b82f6' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Activos
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#111827">
                {activos}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <Star sx={{ color: '#d97706' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Calificación
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#111827">
                {promedioCalificacion}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px' }}>
              <AttachMoney sx={{ color: '#8b5cf6' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Ventas Totales
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#111827">
                ${(totalCompras / 1000000).toFixed(1)}M
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function ModuloClientes() {
  const [clientes] = useState(clientesMock);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const handleClienteAction = (accion, cliente) => {
    // Aquí se implementarían las acciones según el tipo
    switch(accion) {
      case 'contactar':
        console.log('Contactar a:', cliente.nombre);
        // Implementar llamada telefónica o email
        break;
      case 'cotizar':
        console.log('Crear cotización para:', cliente.nombre);
        // Navegar a módulo de cotizaciones
        break;
      case 'seguimiento':
        console.log('Agendar seguimiento con:', cliente.nombre);
        // Abrir calendario/agenda
        break;
      case 'favorito':
        console.log('Marcar como favorito:', cliente.nombre);
        // Actualizar estado del cliente
        break;
    }
  };

  const clientesFiltrados = clientes.filter(cliente => {
    if (filtroEstado !== 'todos' && cliente.estado !== filtroEstado) {
      return false;
    }
    
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        cliente.nombre.toLowerCase().includes(searchLower) ||
        cliente.contacto.toLowerCase().includes(searchLower) ||
        cliente.email.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#1e293b" gutterBottom>
                <Person sx={{ mr: 1.5, verticalAlign: 'middle', color: '#3b82f6' }} />
                Mis Clientes
              </Typography>
              <Typography variant="body2" color="#64748b">
                Gestión de clientes y relaciones comerciales
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                backgroundColor: '#4f46e5',
                '&:hover': { backgroundColor: '#4338ca' },
              }}
            >
              Nuevo Cliente
            </Button>
          </Stack>

          {/* Resumen */}
          <ResumenClientes clientes={clientes} />
        </Box>

        {/* Barra de búsqueda y filtros */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Buscar cliente por nombre, contacto o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={1}>
              <Chip
                label="TODOS"
                clickable
                variant={filtroEstado === 'todos' ? 'filled' : 'outlined'}
                color="primary"
                onClick={() => setFiltroEstado('todos')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
              <Chip
                label="ACTIVOS"
                clickable
                variant={filtroEstado === 'activo' ? 'filled' : 'outlined'}
                color="success"
                onClick={() => setFiltroEstado('activo')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
              <Chip
                label="INACTIVOS"
                clickable
                variant={filtroEstado === 'inactivo' ? 'filled' : 'outlined'}
                color="default"
                onClick={() => setFiltroEstado('inactivo')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Grid de clientes */}
        {clientesFiltrados.length > 0 ? (
          <>
            <Typography variant="subtitle2" color="#64748b" sx={{ mb: 2 }}>
              Mostrando {clientesFiltrados.length} clientes
              {filtroEstado !== 'todos' && ` (${filtroEstado})`}
            </Typography>
            
            <Grid container spacing={2.5}>
              {clientesFiltrados.map((cliente) => (
                <Grid item xs={12} sm={6} md={4} key={cliente.id}>
                  <ClienteCard 
                    cliente={cliente} 
                    onAction={handleClienteAction}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Person sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
            <Typography variant="h6" color="#475569" gutterBottom>
              No se encontraron clientes
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              Intenta con otros términos de búsqueda o cambia los filtros
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}