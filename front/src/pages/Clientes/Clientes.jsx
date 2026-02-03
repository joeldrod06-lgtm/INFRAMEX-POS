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
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  FilterList,
  Person,
  Phone,
  Email,
  LocationOn,
  CalendarMonth,
  AttachMoney,
  Add,
  Star,
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
    calificacion: 4.8,
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
    calificacion: 4.5,
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
    calificacion: 4.2,
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
    calificacion: 4.0,
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
    calificacion: 4.9,
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
    calificacion: 3.8,
  },
];

// Componente de tarjeta de cliente
const ClienteCard = ({ cliente }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'activo': return '#10b981';
      case 'pendiente': return '#f59e0b';
      case 'inactivo': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const calcularDiasDesdeCompra = () => {
    const hoy = new Date();
    const ultima = new Date(cliente.ultimaCompra);
    const diffTime = hoy - ultima;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const diasDesdeCompra = calcularDiasDesdeCompra();

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        height: '100%',
        '&:hover': {
          borderColor: '#3b82f6',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: '#3b82f6', width: 40, height: 40 }}>
              {cliente.nombre.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" fontWeight={500} color="#0f172a">
                {isMobile && cliente.nombre.length > 25 
                  ? `${cliente.nombre.substring(0, 25)}...` 
                  : cliente.nombre}
              </Typography>
              <Typography variant="caption" color="#64748b">
                {cliente.contacto}
              </Typography>
            </Box>
          </Stack>

          {/* Información de contacto simplificada */}
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Phone sx={{ fontSize: 14, color: '#64748b' }} />
              <Typography variant="caption" color="#475569">
                {cliente.telefono}
              </Typography>
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Email sx={{ fontSize: 14, color: '#64748b' }} />
              <Typography variant="caption" color="#475569" sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {cliente.email}
              </Typography>
            </Stack>
          </Stack>

          {/* Estado y calificación */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip
              label={cliente.estado}
              size="small"
              sx={{
                backgroundColor: `${getEstadoColor(cliente.estado)}20`,
                color: getEstadoColor(cliente.estado),
                fontSize: '0.7rem',
              }}
            />
            
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Star sx={{ fontSize: 14, color: '#f59e0b' }} />
              <Typography variant="caption" fontWeight={500} color="#475569">
                {cliente.calificacion}
              </Typography>
            </Stack>
          </Stack>

          {/* Métricas */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="caption" color="#64748b">
                Total compras
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#0f172a">
                ${(cliente.totalCompras / 1000).toFixed(0)}K
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="#64748b">
                Última compra
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight={600} 
                sx={{ 
                  color: diasDesdeCompra > 30 ? '#ef4444' : '#475569'
                }}
              >
                {diasDesdeCompra}d
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Resumen simplificado
const ResumenClientes = ({ clientes }) => {
  const activos = clientes.filter(c => c.estado === 'activo').length;
  const total = clientes.length;

  return (
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
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="#64748b" gutterBottom>
            Clientes registrados
          </Typography>
          <Typography variant="h4" fontWeight={600} color="#0f172a">
            {total}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="#10b981" fontWeight={600}>
              {activos}
            </Typography>
            <Typography variant="caption" color="#64748b">
              Activos
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="#f59e0b" fontWeight={600}>
              {total - activos}
            </Typography>
            <Typography variant="caption" color="#64748b">
              Inactivos
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default function ModuloClientes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [clientes] = useState(clientesMock);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  const clientesFiltrados = clientes.filter(cliente => {
    if (filtroEstado !== 'todos' && cliente.estado !== filtroEstado) {
      return false;
    }
    
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        cliente.nombre.toLowerCase().includes(searchLower) ||
        cliente.contacto.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <Sidebar>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={600} color="#0f172a" gutterBottom>
              <Person sx={{ 
                mr: 1.5, 
                verticalAlign: 'middle', 
                color: '#3b82f6',
                fontSize: '1.5rem'
              }} />
              Mis Clientes
            </Typography>
            <Typography variant="body2" color="#64748b">
              Gestión de clientes asignados
            </Typography>
          </Box>

          {!isMobile && (
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Nuevo Cliente
            </Button>
          )}
        </Stack>

        {/* Resumen simplificado */}
        <ResumenClientes clientes={clientes} />
      </Box>

      {/* Filtros */}
      {(showFilters || !isMobile) && (
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
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
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

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label="Todos"
                clickable
                variant={filtroEstado === 'todos' ? 'filled' : 'outlined'}
                onClick={() => setFiltroEstado('todos')}
                size="small"
              />
              <Chip
                label="Activos"
                clickable
                variant={filtroEstado === 'activo' ? 'filled' : 'outlined'}
                onClick={() => setFiltroEstado('activo')}
                size="small"
              />
              <Chip
                label="Inactivos"
                clickable
                variant={filtroEstado === 'inactivo' ? 'filled' : 'outlined'}
                onClick={() => setFiltroEstado('inactivo')}
                size="small"
              />
            </Stack>
          </Stack>
        </Paper>
      )}

      {/* Clientes */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body2" color="#64748b">
            {clientesFiltrados.length} clientes mostrados
          </Typography>
          
          {isMobile && (
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                backgroundColor: '#f1f5f9',
                '&:hover': { backgroundColor: '#e2e8f0' }
              }}
            >
              <FilterList />
            </IconButton>
          )}
        </Stack>
        
        {clientesFiltrados.length > 0 ? (
          <Grid container spacing={2}>
            {clientesFiltrados.map((cliente) => (
              <Grid item xs={12} sm={6} md={4} key={cliente.id}>
                <ClienteCard cliente={cliente} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Person sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
            <Typography variant="body1" color="#475569" gutterBottom>
              No se encontraron clientes
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              {busqueda ? 'Intenta con otros términos de búsqueda' : 'No tienes clientes asignados'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Sidebar>
  );
}