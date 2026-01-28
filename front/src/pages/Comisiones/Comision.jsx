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
} from '@mui/material';
import {
  AttachMoney,
  ShoppingCart,
  CheckCircle,
  AccountBalance,
  Search,
  TrendingUp,
  TrendingDown,
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
        p: 2.5,
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        height: '100%',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="caption" color="#6b7280" sx={{ mb: 0.5, display: 'block' }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#111827', mb: 0.5 }}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {trend && (
              <>
                {trend.direction === 'up' ? (
                  <TrendingUp sx={{ fontSize: 14, color: '#10b981' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: '#ef4444' }} />
                )}
                <Typography variant="caption" sx={{ 
                  color: trend.direction === 'up' ? '#10b981' : '#ef4444',
                  fontWeight: 500 
                }}>
                  {trend.value}
                </Typography>
              </>
            )}
            <Typography variant="caption" color="#6b7280">
              {subtitle}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ 
          p: 1.5, 
          backgroundColor: '#f8fafc',
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
  const getEstadoChip = (estado) => {
    const config = {
      completada: { color: '#059669', bg: 'rgba(16, 185, 129, 0.1)' },
      pendiente: { color: '#d97706', bg: 'rgba(245, 158, 11, 0.1)' },
    };
    const cfg = config[estado] || config.pendiente;
    
    return (
      <Chip
        label={estado.toUpperCase()}
        size="small"
        sx={{
          backgroundColor: cfg.bg,
          color: cfg.color,
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
      />
    );
  };

  return (
    <TableContainer 
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f9fafb' }}>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Producto</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }} align="right">Total</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }} align="right">Comisión</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#374151' }} align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow 
              key={venta.id}
              sx={{ 
                '&:hover': { backgroundColor: '#f9fafb' },
              }}
            >
              <TableCell>
                <Typography variant="body2" color="#111827">
                  {new Date(venta.fecha).toLocaleDateString('es-MX')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="#111827" fontWeight={500}>
                  {venta.cliente}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="#111827">
                  {venta.producto}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color="#111827" fontWeight={600}>
                  ${venta.total.toLocaleString('es-MX')}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color="#059669" fontWeight={600}>
                  ${venta.comision.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" color="#6b7280">
                  {venta.porcentaje}%
                </Typography>
              </TableCell>
              <TableCell align="center">
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
  const [ventas] = useState(ventasMock);
  const [resumen] = useState(resumenMes);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color="#1e293b" gutterBottom>
            <AttachMoney sx={{ mr: 1.5, verticalAlign: 'middle', color: '#10b981' }} />
            Mis Comisiones
          </Typography>
        </Box>

        {/* Métricas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Total Ventas"
              value={`$${resumen.ventasTotales.toLocaleString('es-MX')}`}
              subtitle="Este mes"
              icon={<ShoppingCart sx={{ color: '#3b82f6' }} />}
              trend={{ direction: 'up', value: '+12%' }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Comisión Total"
              value={`$${resumen.comisionTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
              subtitle="Acumulado"
              icon={<AttachMoney sx={{ color: '#10b981' }} />}
              trend={{ direction: 'up', value: '+8%' }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Por Pagar"
              value={`$${resumen.comisionPorPagar.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
              subtitle="Pendiente"
              icon={<AccountBalance sx={{ color: '#f59e0b' }} />}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricCard
              title="Ventas"
              value={`${resumen.ventasCompletadas}/${resumen.totalVentas}`}
              subtitle="Completadas"
              icon={<CheckCircle sx={{ color: '#8b5cf6' }} />}
            />
          </Grid>
        </Grid>

        {/* Filtros */}
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
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

        {/* Tabla */}
        <Box>
          <Typography variant="subtitle2" color="#64748b" sx={{ mb: 2 }}>
            Mostrando {ventasFiltradas.length} ventas
          </Typography>
          <TablaVentas ventas={ventasFiltradas} />
        </Box>
      </Box>
    </Box>
  );
}