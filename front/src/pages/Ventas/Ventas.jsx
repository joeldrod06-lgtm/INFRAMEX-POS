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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Badge,
  alpha,
  Stack,
} from '@mui/material';
import {
  Search,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Person,
  CheckCircle,
  Store,
  CalendarMonth,
  LocalShipping,
  Pending,
  Cancel,
  Receipt,
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
  {
    id: 6,
    numero: 'VEN-006-2024',
    cliente: 'Decoraciones Lux',
    vendedor: 'Juan Pérez',
    fecha: '2024-12-09',
    total: 7600,
    estado: 'completada',
    categoria: 'Acabados',
    productos: 3,
    comision: 1140,
  },
  {
    id: 7,
    numero: 'VEN-007-2024',
    cliente: 'Proyectos Urbanos',
    vendedor: 'Roberto Sánchez',
    fecha: '2024-12-08',
    total: 12500,
    estado: 'cancelada',
    categoria: 'Construcción',
    productos: 2,
    comision: 0,
  },
  {
    id: 8,
    numero: 'VEN-008-2024',
    cliente: 'Techos Modernos',
    vendedor: 'María González',
    fecha: '2024-12-07',
    total: 34000,
    estado: 'completada',
    categoria: 'Construcción',
    productos: 6,
    comision: 5100,
  },
];

// Datos de vendedores
const vendedoresEquipo = [
  { id: 1, nombre: 'Juan Pérez', iniciales: 'JP', color: '#3b82f6', desempenio: 95, ventas: 3, total: 45100, comision: 4570 },
  { id: 2, nombre: 'María González', iniciales: 'MG', color: '#8b5cf6', desempenio: 88, ventas: 2, total: 76500, comision: 11475 },
  { id: 3, nombre: 'Carlos López', iniciales: 'CL', color: '#10b981', desempenio: 72, ventas: 1, total: 5550, comision: 832.5 },
  { id: 4, nombre: 'Ana Martínez', iniciales: 'AM', color: '#f59e0b', desempenio: 65, ventas: 1, total: 19600, comision: 1960 },
  { id: 5, nombre: 'Roberto Sánchez', iniciales: 'RS', color: '#ef4444', desempenio: 45, ventas: 1, total: 12500, comision: 0 },
];

// Componente de tarjeta de métrica refinada
const MetricCard = ({ title, value, subtitle, icon, color, trend }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        minHeight: 110,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Box sx={{ 
          width: 36, 
          height: 36, 
          borderRadius: 1.5,
          backgroundColor: alpha(color, 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {React.cloneElement(icon, { sx: { fontSize: 18, color } })}
        </Box>
        <Typography variant="caption" sx={{ 
          color: 'grey.600',
          fontWeight: 500,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {title}
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h5" fontWeight={700} sx={{ 
          color: 'grey.900', 
          mb: 0.5,
          fontSize: '1.5rem',
          lineHeight: 1.2,
        }}>
          {value}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ 
            color: 'grey.600', 
            fontSize: '0.75rem',
          }}>
            {subtitle}
          </Typography>
          {trend && (
            <Chip
              label={trend.value}
              size="small"
              sx={{
                backgroundColor: trend.direction === 'up' ? 
                  alpha('#10b981', 0.1) : 
                  alpha('#ef4444', 0.1),
                color: trend.direction === 'up' ? '#059669' : '#dc2626',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
                '& .MuiChip-icon': {
                  fontSize: 14,
                  margin: '0 2px 0 4px',
                }
              }}
              icon={trend.direction === 'up' ? 
                <TrendingUp fontSize="inherit" /> : 
                <TrendingDown fontSize="inherit" />
              }
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// Componente de desempeño del equipo compacto
const DesempenioEquipo = ({ vendedores }) => {
  const totalVentas = vendedores.reduce((sum, v) => sum + v.ventas, 0);
  const totalMonto = vendedores.reduce((sum, v) => sum + v.total, 0);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2,
      }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'grey.900', mb: 0.25 }}>
            Desempeño del Equipo
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.600' }}>
            Resumen por vendedor
          </Typography>
        </Box>
        <Badge 
          badgeContent={totalVentas} 
          color="primary" 
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',
              height: 20,
              minWidth: 20,
            }
          }}
        />
      </Box>
      
      <Stack spacing={1.5}>
        {vendedores.map((vendedor) => (
          <Box 
            key={vendedor.id}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1,
              borderRadius: 1,
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
              '&:hover': {
                backgroundColor: 'grey.100',
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                fontSize: '0.75rem', 
                bgcolor: vendedor.color,
                fontWeight: 600,
              }}
            >
              {vendedor.iniciales}
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 0.5,
              }}>
                <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.900' }}>
                  {vendedor.nombre}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: vendedor.color,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  backgroundColor: alpha(vendedor.color, 0.1),
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                }}>
                  {vendedor.desempenio}%
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={vendedor.desempenio}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'grey.200',
                  mb: 0.5,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    backgroundColor: vendedor.color,
                  }
                }}
              />
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
              }}>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  {vendedor.ventas} ventas • ${vendedor.total.toLocaleString('es-MX')}
                </Typography>
                {vendedor.comision > 0 && (
                  <Typography variant="caption" sx={{ 
                    color: '#059669',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}>
                    +${vendedor.comision.toLocaleString('es-MX')}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
      
      <Box sx={{ 
        mt: 2, 
        pt: 1.5, 
        borderTop: '1px solid',
        borderColor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="caption" sx={{ color: 'grey.600', fontWeight: 500 }}>
          Total equipo
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'grey.900',
          fontWeight: 700,
        }}>
          ${totalMonto.toLocaleString('es-MX')}
        </Typography>
      </Box>
    </Paper>
  );
};

// Componente de tabla de ventas compacta
const TablaVentas = ({ ventas }) => {
  const getEstadoConfig = (estado) => {
    const config = {
      completada: { 
        color: '#059669', 
        bg: alpha('#10b981', 0.1), 
        icon: <CheckCircle fontSize="small" />,
      },
      pendiente: { 
        color: '#d97706', 
        bg: alpha('#f59e0b', 0.1), 
        icon: <Pending fontSize="small" />,
      },
      enviada: { 
        color: '#3b82f6', 
        bg: alpha('#3b82f6', 0.1), 
        icon: <LocalShipping fontSize="small" />,
      },
      cancelada: { 
        color: '#ef4444', 
        bg: alpha('#ef4444', 0.1), 
        icon: <Cancel fontSize="small" />,
      },
    };
    return config[estado] || config.pendiente;
  };

  const getAvatarVendedor = (nombreVendedor) => {
    const vendedor = vendedoresEquipo.find(v => v.nombre === nombreVendedor);
    if (!vendedor) return null;
    
    return (
      <Avatar sx={{ 
        width: 28, 
        height: 28, 
        fontSize: '0.75rem', 
        bgcolor: vendedor.color,
        fontWeight: 600,
      }}>
        {vendedor.iniciales}
      </Avatar>
    );
  };

  return (
    <TableContainer 
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'white',
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ 
            backgroundColor: 'grey.50',
            '& th': {
              borderBottom: '2px solid',
              borderColor: 'grey.200',
              py: 1,
              px: 2,
              fontWeight: 600,
              color: 'grey.700',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }
          }}>
            <TableCell>VENTA</TableCell>
            <TableCell>CLIENTE</TableCell>
            <TableCell>VENDEDOR</TableCell>
            <TableCell>FECHA</TableCell>
            <TableCell align="right">TOTAL</TableCell>
            <TableCell align="center">ESTADO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta) => {
            const estado = getEstadoConfig(venta.estado);
            return (
              <TableRow 
                key={venta.id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'grey.50',
                  },
                  '& td': {
                    py: 1.5,
                    px: 2,
                    borderBottom: '1px solid',
                    borderColor: 'grey.100',
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      width: 28, 
                      height: 28, 
                      borderRadius: 1,
                      backgroundColor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Receipt sx={{ fontSize: 14, color: 'grey.600' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ color: 'grey.900', fontSize: '0.875rem' }}>
                        {venta.numero}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.600', fontSize: '0.75rem' }}>
                        {venta.productos} {venta.productos === 1 ? 'producto' : 'productos'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500} sx={{ color: 'grey.900', fontSize: '0.875rem' }}>
                      {venta.cliente}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'grey.600', fontSize: '0.75rem' }}>
                      {venta.categoria}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getAvatarVendedor(venta.vendedor)}
                    <Typography variant="body2" sx={{ color: 'grey.900', fontSize: '0.875rem' }}>
                      {venta.vendedor}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonth sx={{ fontSize: 14, color: 'grey.600' }} />
                    <Typography variant="body2" sx={{ color: 'grey.900', fontSize: '0.875rem' }}>
                      {new Date(venta.fecha).toLocaleDateString('es-MX', { 
                        day: '2-digit',
                        month: 'short'
                      })}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <Typography variant="body2" fontWeight={700} sx={{ color: 'grey.900', fontSize: '0.875rem' }}>
                      ${venta.total.toLocaleString('es-MX')}
                    </Typography>
                    {venta.comision > 0 && (
                      <Typography variant="caption" sx={{ color: '#059669', fontWeight: 500, fontSize: '0.75rem' }}>
                        +${venta.comision.toLocaleString('es-MX')}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={venta.estado.toUpperCase()}
                    size="small"
                    icon={estado.icon}
                    sx={{
                      backgroundColor: estado.bg,
                      color: estado.color,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 24,
                      px: 1,
                      '& .MuiChip-icon': {
                        fontSize: 14,
                        color: estado.color,
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function DashboardVentas() {
  const [ventas] = useState(ventasSistema);
  const [busqueda, setBusqueda] = useState('');
  const [filtroVendedor, setFiltroVendedor] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Cálculo de métricas
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const ventasCompletadas = ventas.filter(v => v.estado === 'completada').length;
  const promedioVenta = totalVentas / ventas.length;
  const vendedorActual = 'Juan Pérez';
  const ventasVendedorActual = ventas.filter(v => v.vendedor === vendedorActual);
  const totalVendedorActual = ventasVendedorActual.reduce((sum, v) => sum + v.total, 0);
  const ventasHoy = ventas.filter(v => 
    new Date(v.fecha).toDateString() === new Date().toDateString()
  ).length;

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

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'grey.50',
    }}>
      <Sidebar />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          p: 3,
          ml: { md: 0 },
          width: { md: `calc(100% - 260px)` },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2 
          }}>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ 
                color: 'grey.900',
                mb: 0.5,
              }}>
                <Store sx={{ mr: 1.5, verticalAlign: 'middle', color: '#8b5cf6' }} />
                Ventas del Sistema
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.600' }}>
                Panorama completo de todas las transacciones comerciales
              </Typography>
            </Box>

            <Chip
              label={`Hoy: ${ventasHoy}`}
              size="small"
              sx={{
                backgroundColor: alpha('#3b82f6', 0.1),
                color: '#3b82f6',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 26,
              }}
            />
          </Box>

          {/* Métricas principales */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="TOTAL VENTAS"
                value={`$${totalVentas.toLocaleString('es-MX')}`}
                subtitle="Acumulado del mes"
                icon={<AttachMoney />}
                color="#3b82f6"
                trend={{ direction: 'up', value: '+15%' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="MIS VENTAS"
                value={`$${totalVendedorActual.toLocaleString('es-MX')}`}
                subtitle="Mi contribución"
                icon={<Person />}
                color="#10b981"
                trend={{ direction: 'up', value: '+8%' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="EFECTIVIDAD"
                value={`${Math.round((ventasCompletadas / ventas.length) * 100)}%`}
                subtitle="Ventas completadas"
                icon={<CheckCircle />}
                color="#f59e0b"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="PROMEDIO"
                value={`$${promedioVenta.toLocaleString('es-MX', { minimumFractionDigits: 0 })}`}
                subtitle="Por transacción"
                icon={<TrendingUp />}
                color="#8b5cf6"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Contenido principal */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {/* Filtros */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'white',
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 2 
              }}>
                <TextField
                  fullWidth
                  placeholder="Buscar ventas..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      backgroundColor: 'grey.50',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ fontSize: 20, color: 'grey.500' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  width: { md: 'auto', xs: '100%' } 
                }}>
                  <FormControl size="small" sx={{ flex: 1, minWidth: 140 }}>
                    <InputLabel>Vendedor</InputLabel>
                    <Select
                      value={filtroVendedor}
                      label="Vendedor"
                      onChange={(e) => setFiltroVendedor(e.target.value)}
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      {vendedoresEquipo.map(v => (
                        <MenuItem key={v.id} value={v.nombre}>{v.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={filtroEstado}
                      label="Estado"
                      onChange={(e) => setFiltroEstado(e.target.value)}
                      sx={{ borderRadius: 1 }}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="completada">Completada</MenuItem>
                      <MenuItem value="pendiente">Pendiente</MenuItem>
                      <MenuItem value="enviada">Enviada</MenuItem>
                      <MenuItem value="cancelada">Cancelada</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Paper>

            {/* Tabla de ventas */}
            <Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 1.5,
              }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'grey.900' }}>
                  Historial de Ventas
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  {ventasFiltradas.length} ventas encontradas
                </Typography>
              </Box>
              <TablaVentas ventas={ventasFiltradas} />
            </Box>
          </Grid>

          <Grid item xs={12} lg={4}>
            {/* Panel de desempeño del equipo */}
            <DesempenioEquipo vendedores={vendedoresEquipo} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}