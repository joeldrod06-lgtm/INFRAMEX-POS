import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Search,
  FilterList,
  AttachMoney,
  Person,
  Store,
  CheckCircle,
  TrendingUp,
  Receipt,
  CalendarMonth,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos mock de ventas
const ventasSistema = [
  {
    id: 1,
    numero: 'VEN-001-2024',
    cliente: 'Constructora Progreso S.A.',
    vendedor: 'Juan Pérez',
    fecha: '2024-12-14',
    total: 21500,
    estado: 'completada',
    categoria: 'Construcción',
    productos: 3,
    comision: 2150,
  },
  {
    id: 2,
    numero: 'VEN-002-2024',
    cliente: 'Electricidad Moderna',
    vendedor: 'María González',
    fecha: '2024-12-13',
    total: 42500,
    estado: 'completada',
    categoria: 'Eléctrico',
    productos: 5,
    comision: 6375,
  },
  {
    id: 3,
    numero: 'VEN-003-2024',
    cliente: 'Arquitectura & Diseño',
    vendedor: 'Juan Pérez',
    fecha: '2024-12-12',
    total: 16000,
    estado: 'pendiente',
    categoria: 'Pinturas',
    productos: 2,
    comision: 1280,
  },
  {
    id: 4,
    numero: 'VEN-004-2024',
    cliente: 'Hogar Feliz',
    vendedor: 'Carlos López',
    fecha: '2024-12-11',
    total: 5550,
    estado: 'completada',
    categoria: 'Adhesivos',
    productos: 1,
    comision: 832.5,
  },
  {
    id: 5,
    numero: 'VEN-005-2024',
    cliente: 'Ingeniería Civil S.A.',
    vendedor: 'Ana Martínez',
    fecha: '2024-12-10',
    total: 19600,
    estado: 'enviada',
    categoria: 'Acero',
    productos: 4,
    comision: 1960,
  },
];

// Datos de vendedores
const vendedoresEquipo = [
  { id: 1, nombre: 'Juan Pérez', iniciales: 'JP', color: '#3b82f6', ventas: 2, total: 37500 },
  { id: 2, nombre: 'María González', iniciales: 'MG', color: '#8b5cf6', ventas: 1, total: 42500 },
  { id: 3, nombre: 'Carlos López', iniciales: 'CL', color: '#10b981', ventas: 1, total: 5550 },
  { id: 4, nombre: 'Ana Martínez', iniciales: 'AM', color: '#f59e0b', ventas: 1, total: 19600 },
];

// Componente de tarjeta de métrica simplificada
const MetricCard = ({ title, value, subtitle, icon, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        height: '100%',
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="caption" color="#64748b" sx={{ mb: 0.5, display: 'block', fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#0f172a', mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="#64748b">
            {subtitle}
          </Typography>
        </Box>
        <Box sx={{ 
          p: 1, 
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
};

// Componente de tarjeta de venta simplificada
const VentaCard = ({ venta }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'completada': return '#10b981';
      case 'pendiente': return '#f59e0b';
      case 'enviada': return '#3b82f6';
      default: return '#64748b';
    }
  };

  const getVendedorColor = (nombre) => {
    const vendedor = vendedoresEquipo.find(v => v.nombre === nombre);
    return vendedor ? vendedor.color : '#64748b';
  };

  const vendedorColor = getVendedorColor(venta.vendedor);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        '&:hover': {
          borderColor: '#3b82f6',
        },
      }}
    >
      <Stack spacing={2}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle2" fontWeight={600} color="#0f172a" gutterBottom>
              {venta.numero}
            </Typography>
            <Typography variant="body2" color="#475569">
              {venta.cliente}
            </Typography>
          </Box>
          
          <Chip
            label={venta.estado}
            size="small"
            sx={{
              backgroundColor: `${getEstadoColor(venta.estado)}20`,
              color: getEstadoColor(venta.estado),
              fontSize: '0.7rem',
            }}
          />
        </Stack>

        {/* Información de la venta */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ 
              width: 28, 
              height: 28, 
              fontSize: '0.75rem', 
              bgcolor: vendedorColor,
              fontWeight: 600,
            }}>
              {venta.vendedor.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Typography variant="caption" color="#475569">
              {venta.vendedor}
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarMonth sx={{ fontSize: 14, color: '#64748b' }} />
            <Typography variant="caption" color="#475569">
              {new Date(venta.fecha).toLocaleDateString('es-MX', { 
                day: '2-digit',
                month: 'short'
              })}
            </Typography>
          </Stack>
        </Stack>

        {/* Total y comisión */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" color="#64748b" display="block">
              Total
            </Typography>
            <Typography variant="body2" fontWeight={600} color="#0f172a">
              ${venta.total.toLocaleString('es-MX')}
            </Typography>
          </Box>
          
          {venta.comision > 0 && (
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="#64748b" display="block">
                Comisión
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#10b981">
                ${venta.comision.toLocaleString('es-MX')}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

// Componente de panel lateral derecho fijo
const PanelDerechoEquipo = ({ vendedores }) => {
  const totalVentas = vendedores.reduce((sum, v) => sum + v.total, 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return null; // Ocultar panel en móviles y tablets
  }

  return (
    <Box
      sx={{
        width: '280px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#000', 0.1),
          borderRadius: 2,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          height: '100%',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="#0f172a" gutterBottom>
          Desempeño del equipo
        </Typography>
        
        <Stack spacing={2} sx={{ mt: 3 }}>
          {vendedores.map((vendedor) => (
            <Box key={vendedor.id}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  fontSize: '0.875rem', 
                  bgcolor: vendedor.color,
                  fontWeight: 600,
                }}>
                  {vendedor.iniciales}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600} color="#0f172a">
                    {vendedor.nombre}
                  </Typography>
                  <Typography variant="caption" color="#64748b">
                    {vendedor.ventas} ventas
                  </Typography>
                </Box>
              </Stack>
              
              <Box sx={{ ml: 5.5, mt: 0.5 }}>
                <Typography variant="body2" fontWeight={600} color="#0f172a">
                  ${vendedor.total.toLocaleString('es-MX')}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        
        <Box sx={{ 
          mt: 4, 
          pt: 2.5, 
          borderTop: '1px solid #e2e8f0',
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight={600} color="#0f172a">
              Total equipo
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#0f172a">
              ${totalVentas.toLocaleString('es-MX')}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default function DashboardVentas() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [ventas] = useState(ventasSistema);
  const [busqueda, setBusqueda] = useState('');
  const [filtroVendedor, setFiltroVendedor] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  // Cálculo de métricas
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const ventasCompletadas = ventas.filter(v => v.estado === 'completada').length;
  const vendedorActual = 'Juan Pérez';
  const ventasVendedorActual = ventas.filter(v => v.vendedor === vendedorActual);
  const totalVendedorActual = ventasVendedorActual.reduce((sum, v) => sum + v.total, 0);

  const ventasFiltradas = ventas.filter(venta => {
    if (filtroVendedor !== 'todos' && venta.vendedor !== filtroVendedor) {
      return false;
    }
    
    if (filtroEstado !== 'todos' && venta.estado !== filtroEstado) {
      return false;
    }
    
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        venta.cliente.toLowerCase().includes(searchLower) ||
        venta.numero.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatCurrency = (amount) => {
    if (isMobile && amount >= 100000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toLocaleString('es-MX')}`;
  };

  return (
    <Sidebar>
      <Box sx={{ 
        display: 'flex', 
        gap: 3,
        minHeight: 'calc(100vh - 64px)',
      }}>
        {/* Contenido principal - ocupa el espacio restante */}
        <Box sx={{ 
          flex: 1,
          minWidth: 0, // Previene desbordamiento
        }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="h5" fontWeight={600} color="#0f172a" gutterBottom>
                  <Store sx={{ 
                    mr: 1.5, 
                    verticalAlign: 'middle', 
                    color: '#8b5cf6',
                    fontSize: '1.5rem'
                  }} />
                  Ventas del Sistema
                </Typography>
                <Typography variant="body2" color="#64748b">
                  Resumen de todas las transacciones
                </Typography>
              </Box>
              
              {isMobile && (
                <Chip
                  label={`${ventas.length} ventas`}
                  size="small"
                  sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
                />
              )}
            </Stack>

            {/* Métricas */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6} md={3}>
                <MetricCard
                  title="Total Ventas"
                  value={formatCurrency(totalVentas)}
                  subtitle="Acumulado"
                  icon={<AttachMoney sx={{ color: '#3b82f6' }} />}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <MetricCard
                  title="Mis Ventas"
                  value={formatCurrency(totalVendedorActual)}
                  subtitle="Mi contribución"
                  icon={<Person sx={{ color: '#10b981' }} />}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <MetricCard
                  title="Completadas"
                  value={`${ventasCompletadas}`}
                  subtitle="Ventas finalizadas"
                  icon={<CheckCircle sx={{ color: '#f59e0b' }} />}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <MetricCard
                  title="Promedio"
                  value={formatCurrency(totalVentas / ventas.length)}
                  subtitle="Por venta"
                  icon={<TrendingUp sx={{ color: '#8b5cf6' }} />}
                />
              </Grid>
            </Grid>
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
                  placeholder="Buscar ventas..."
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

                <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <InputLabel>Vendedor</InputLabel>
                    <Select
                      value={filtroVendedor}
                      label="Vendedor"
                      onChange={(e) => setFiltroVendedor(e.target.value)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      {vendedoresEquipo.map(v => (
                        <MenuItem key={v.id} value={v.nombre}>{v.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ flex: 1 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={filtroEstado}
                      label="Estado"
                      onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="completada">Completada</MenuItem>
                      <MenuItem value="pendiente">Pendiente</MenuItem>
                      <MenuItem value="enviada">Enviada</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            </Paper>
          )}

          {/* Ventas recientes */}
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="#0f172a">
                Ventas recientes
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={1}>
                {isTablet && (
                  <Chip
                    label={`${ventasFiltradas.length} items`}
                    size="small"
                    sx={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '0.7rem' }}
                  />
                )}
                {isMobile && (
                  <IconButton
                    onClick={() => setShowFilters(!showFilters)}
                    size="small"
                    sx={{
                      backgroundColor: '#f1f5f9',
                      '&:hover': { backgroundColor: '#e2e8f0' }
                    }}
                  >
                    <FilterList fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            </Stack>

            {ventasFiltradas.length > 0 ? (
              <Stack spacing={2}>
                {ventasFiltradas.map((venta) => (
                  <VentaCard key={venta.id} venta={venta} />
                ))}
              </Stack>
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
                <Receipt sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                <Typography variant="body1" color="#475569" gutterBottom>
                  No se encontraron ventas
                </Typography>
                <Typography variant="body2" color="#94a3b8">
                  {busqueda ? 'Intenta con otros términos de búsqueda' : 'No hay ventas registradas'}
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Panel lateral derecho - solo visible en escritorio */}
        <PanelDerechoEquipo vendedores={vendedoresEquipo} />
      </Box>
    </Sidebar>
  );
}