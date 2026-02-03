import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AttachMoney,
  ShoppingCart,
  CheckCircle,
  AccountBalance,
  Search,
  TrendingUp,
  TrendingDown,
  FilterList,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos mock de ventas
const ventasMock = [
  {
    id: 1,
    fecha: '2024-12-15',
    cliente: 'Constructora Progreso S.A.',
    producto: 'Cemento Gris 50kg',
    total: 21500,
    estado: 'completada',
    comision: 2150,
    porcentaje: 10,
  },
  {
    id: 2,
    fecha: '2024-12-14',
    cliente: 'Electricidad Moderna',
    producto: 'Cable THHN 12 AWG',
    total: 42500,
    estado: 'completada',
    comision: 6375,
    porcentaje: 15,
  },
  {
    id: 3,
    fecha: '2024-12-13',
    cliente: 'Arquitectura & Diseño',
    producto: 'Pintura Vinil Blanca 4L',
    total: 16000,
    estado: 'pendiente',
    comision: 0,
    porcentaje: 8,
  },
  {
    id: 4,
    fecha: '2024-12-12',
    cliente: 'Hogar Feliz',
    producto: 'Pegazulejo 20kg',
    total: 5550,
    estado: 'completada',
    comision: 832.5,
    porcentaje: 15,
  },
  {
    id: 5,
    fecha: '2024-12-11',
    cliente: 'Ingeniería Civil S.A.',
    producto: 'Varilla 3/8"',
    total: 19600,
    estado: 'completada',
    comision: 1960,
    porcentaje: 10,
  },
  {
    id: 6,
    fecha: '2024-12-10',
    cliente: 'Decoraciones Lux',
    producto: 'Yeso 25kg',
    total: 7600,
    estado: 'completada',
    comision: 1140,
    porcentaje: 15,
  },
  {
    id: 7,
    fecha: '2024-12-09',
    cliente: 'Proyectos Urbanos',
    producto: 'Block Hueco 15x20x40',
    total: 12500,
    estado: 'completada',
    comision: 1250,
    porcentaje: 10,
  },
];

// Resumen del mes
const resumenMes = {
  ventasTotales: 127250,
  comisionTotal: 13307.5,
  comisionPorPagar: 5307.5,
  ventasCompletadas: 6,
  totalVentas: 7,
};

// Componente de métrica
const MetricCard = ({ title, value, subtitle, icon, trend }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2.5 },
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        height: '100%',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#cbd5e1',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box sx={{ flex: 1, mr: 1 }}>
          <Typography variant="caption" color="#64748b" sx={{ mb: 0.5, display: 'block', fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#0f172a', mb: 0.5, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap">
            {trend && (
              <>
                {trend.direction === 'up' ? (
                  <TrendingUp sx={{ fontSize: 14, color: '#10b981' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: '#ef4444' }} />
                )}
                <Typography variant="caption" sx={{ 
                  color: trend.direction === 'up' ? '#10b981' : '#ef4444',
                  fontWeight: 600 
                }}>
                  {trend.value}
                </Typography>
              </>
            )}
            <Typography variant="caption" color="#64748b" sx={{ fontWeight: 500 }}>
              {subtitle}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ 
          p: 1.5, 
          backgroundColor: '#f1f5f9',
          borderRadius: '10px',
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

// Componente de tabla
const TablaVentas = ({ ventas }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const getEstadoChip = (estado) => {
    const config = {
      completada: { color: '#059669', bg: '#dcfce7' },
      pendiente: { color: '#d97706', bg: '#fef3c7' },
    };
    const cfg = config[estado] || config.pendiente;
    
    return (
      <Chip
        label={isMobile ? estado.charAt(0).toUpperCase() : estado.toUpperCase()}
        size="small"
        sx={{
          backgroundColor: cfg.bg,
          color: cfg.color,
          fontWeight: 600,
          fontSize: '0.7rem',
          minWidth: isMobile ? '40px' : 'auto',
          '& .MuiChip-label': {
            px: isMobile ? 0.5 : 1,
          }
        }}
      />
    );
  };

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {ventas.map((venta) => (
          <Paper
            key={venta.id}
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="caption" color="#64748b">
                    {new Date(venta.fecha).toLocaleDateString('es-MX')}
                  </Typography>
                  <Typography variant="subtitle2" color="#0f172a" fontWeight={600}>
                    {venta.cliente}
                  </Typography>
                </Box>
                {getEstadoChip(venta.estado)}
              </Box>
              
              <Typography variant="body2" color="#475569">
                {venta.producto}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                pt: 1,
                borderTop: '1px dashed #e2e8f0'
              }}>
                <Box>
                  <Typography variant="caption" color="#64748b" display="block">
                    Total
                  </Typography>
                  <Typography variant="body2" color="#0f172a" fontWeight={600}>
                    ${venta.total.toLocaleString('es-MX')}
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="#64748b" display="block">
                    Comisión
                  </Typography>
                  <Typography variant="body2" color="#059669" fontWeight={600}>
                    ${venta.comision.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="caption" color="#64748b">
                    ({venta.porcentaje}%)
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer 
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8fafc' }}>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }}>Producto</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }} align="right">Total</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }} align="right">Comisión</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#334155', py: 2 }} align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow 
              key={venta.id}
              sx={{ 
                '&:hover': { backgroundColor: '#f8fafc' },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" color="#0f172a">
                  {new Date(venta.fecha).toLocaleDateString('es-MX')}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" color="#0f172a" fontWeight={500}>
                  {venta.cliente}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2 }}>
                <Typography variant="body2" color="#0f172a">
                  {venta.producto}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>
                <Typography variant="body2" color="#0f172a" fontWeight={600}>
                  ${venta.total.toLocaleString('es-MX')}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 2 }}>
                <Typography variant="body2" color="#059669" fontWeight={600}>
                  ${venta.comision.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" color="#64748b">
                  {venta.porcentaje}%
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ py: 2 }}>
                {getEstadoChip(venta.estado)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function ModuloComisiones() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [ventas] = useState(ventasMock);
  const [resumen] = useState(resumenMes);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  const ventasFiltradas = ventas.filter(venta => {
    if (filtroEstado !== 'todos' && venta.estado !== filtroEstado) {
      return false;
    }
    
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        venta.cliente.toLowerCase().includes(searchLower) ||
        venta.producto.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatCurrency = (amount) => {
    if (isMobile && amount >= 100000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
  };

  return (
    <Sidebar>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={700} color="#0f172a" gutterBottom>
              <AttachMoney sx={{ 
                mr: 1.5, 
                verticalAlign: 'middle', 
                color: '#10b981',
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }} />
              Mis Comisiones
            </Typography>
            <Typography variant="body2" color="#64748b">
              Resumen de ventas y comisiones del mes actual
            </Typography>
          </Box>
          
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
      </Box>

      {/* Métricas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={3}>
          <MetricCard
            title="Total Ventas"
            value={formatCurrency(resumen.ventasTotales)}
            subtitle="Este mes"
            icon={<ShoppingCart sx={{ color: '#3b82f6', fontSize: { xs: 20, sm: 24 } }} />}
            trend={{ direction: 'up', value: '+12%' }}
          />
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <MetricCard
            title="Comisión Total"
            value={formatCurrency(resumen.comisionTotal)}
            subtitle="Acumulado"
            icon={<AttachMoney sx={{ color: '#10b981', fontSize: { xs: 20, sm: 24 } }} />}
            trend={{ direction: 'up', value: '+8%' }}
          />
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <MetricCard
            title="Por Pagar"
            value={formatCurrency(resumen.comisionPorPagar)}
            subtitle="Pendiente"
            icon={<AccountBalance sx={{ color: '#f59e0b', fontSize: { xs: 20, sm: 24 } }} />}
          />
        </Grid>
        
        <Grid item xs={6} sm={6} md={3}>
          <MetricCard
            title="Ventas"
            value={`${resumen.ventasCompletadas}/${resumen.totalVentas}`}
            subtitle="Completadas"
            icon={<CheckCircle sx={{ color: '#8b5cf6', fontSize: { xs: 20, sm: 24 } }} />}
          />
        </Grid>
      </Grid>

      {/* Filtros */}
      {(showFilters || !isMobile) && (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            mb: 3,
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={isMobile ? 'stretch' : 'center'}>
            <TextField
              placeholder="Buscar cliente o producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 } }}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filtroEstado}
                label="Estado"
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="completada">Completadas</MenuItem>
                <MenuItem value="pendiente">Pendientes</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      )}

      {/* Tabla */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="subtitle2" color="#64748b" fontWeight={500}>
            Mostrando {ventasFiltradas.length} ventas
          </Typography>
          
          {isMobile && (
            <Chip
              label={`${ventasFiltradas.length} items`}
              size="small"
              sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
            />
          )}
        </Box>
        
        <TablaVentas ventas={ventasFiltradas} />
      </Box>
    </Sidebar>
  );
}