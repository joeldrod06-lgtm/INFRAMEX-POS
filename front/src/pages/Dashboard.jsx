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
  alpha,
  Paper,
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Stack,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  People,
  LocalShipping,
  TrendingUp,
  CheckCircle,
  CreditCard,
  AttachMoney,
  CalendarToday,
  ShowChart,
  Assessment,
  Assignment,
  Payment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../shared/components/SideBar';

export default function DashboardUsuario() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Datos simulados del usuario
  const usuarioInfo = {
    nombre: 'Joel Duran',
    rol: 'Vendedor',
    sucursal: 'Sucursal Centro',
    metaVentas: 85,
    pedidosPendientes: 5,
    clientesActivos: 24,
    comisionMensual: '$4,250',
    porcentajeComision: 2.5
  };

  // Tareas del usuario
  const tareasUsuario = [
    { id: 1, descripcion: 'Seguimiento a cliente ElectroCom', fecha: 'Hoy, 15:00', completada: false, prioridad: 'alta' },
    { id: 2, descripcion: 'Actualizar inventario sección cables', fecha: 'Mañana', completada: false, prioridad: 'media' },
    { id: 3, descripcion: 'Reporte de ventas semanal', fecha: 'Viernes', completada: true, prioridad: 'media' },
    { id: 4, descripcion: 'Reunión de equipo comercial', fecha: '01/03, 10:00', completada: false, prioridad: 'alta' },
    { id: 5, descripcion: 'Contactar nuevos prospectos', fecha: 'Esta semana', completada: false, prioridad: 'baja' },
  ];

  // Ventas a crédito del mes
  const ventasCredito = [
    { id: '#VC-001', cliente: 'ElectroCom S.A.', monto: '$12,500', fecha: '15/02/2024', plazo: '30 días', estado: 'Pendiente' },
    { id: '#VC-002', cliente: 'Comercial MX', monto: '$8,700', fecha: '10/02/2024', plazo: '45 días', estado: 'Pendiente' },
    { id: '#VC-003', cliente: 'TecnoSoluciones', monto: '$5,200', fecha: '05/02/2024', plazo: '60 días', estado: 'Pagado' },
    { id: '#VC-004', cliente: 'Distribuidora Norte', monto: '$3,800', fecha: '28/01/2024', plazo: '30 días', estado: 'Pagado' },
  ];

  // Resumen de comisiones
  const resumenComisiones = {
    ventasTotalesMes: '$185,400',
    ventasCreditoMes: '$30,200',
    porcentajeComision: '2.5%',
    comisionCalculada: '$4,635',
    comisionPagada: '$2,850',
    comisionPendiente: '$1,785'
  };

  // KPIs principales
  const kpis = [
    {
      title: 'Progreso de Meta',
      value: `${usuarioInfo.metaVentas}%`,
      icon: <TrendingUp />,
      color: '#0369a1',
      bgColor: '#f0f9ff',
      progress: usuarioInfo.metaVentas,
      subtitle: `Ventas: ${resumenComisiones.ventasTotalesMes}`
    },
    {
      title: 'Comisión Acumulada',
      value: resumenComisiones.comisionCalculada,
      icon: <AttachMoney />,
      color: '#16a34a',
      bgColor: '#f0fdf4',
      subtitle: `${resumenComisiones.porcentajeComision} sobre ventas`,
      trend: '+12.5%'
    },
    {
      title: 'Ventas a Crédito',
      value: resumenComisiones.ventasCreditoMes,
      icon: <CreditCard />,
      color: '#9333ea',
      bgColor: '#faf5ff',
      subtitle: `${ventasCredito.filter(v => v.estado === 'Pendiente').length} pendientes`
    },
    {
      title: 'Eficiencia',
      value: '92%',
      icon: <ShowChart />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      subtitle: 'Tasa de conversión',
      progress: 92
    }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar superior */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#ffffff',
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: 'text.primary'
          }}
        >
          <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 } }}>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap sx={{ fontWeight: 600, color: '#111827' }}>
                Dashboard
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Chip 
                label={usuarioInfo.sucursal}
                size="small"
                sx={{ 
                  bgcolor: '#e0f2fe', 
                  color: '#0369a1',
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'flex' }
                }}
              />
              <IconButton size="medium" sx={{ position: 'relative' }}>
                <NotificationsIcon sx={{ color: '#6b7280' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    bgcolor: '#ef4444',
                    borderRadius: '50%'
                  }}
                />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#2563eb', fontWeight: 600 }}>
                  {usuarioInfo.nombre.charAt(0)}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {usuarioInfo.nombre}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280', lineHeight: 1.2 }}>
                    {usuarioInfo.rol}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Contenido principal */}
        <Container maxWidth="xl" sx={{ 
          flex: 1, 
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 }
        }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
              ¡Bienvenido, {usuarioInfo.nombre}!
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 3 }}>
              Resumen completo de tus actividades y métricas de desempeño
            </Typography>
            
            {/* Estadísticas rápidas */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#e0f2fe'
                    }}>
                      <People sx={{ color: '#0369a1' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                        {usuarioInfo.clientesActivos}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Clientes activos
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#f0fdf4'
                    }}>
                      <LocalShipping sx={{ color: '#16a34a' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                        {usuarioInfo.pedidosPendientes}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Pedidos pendientes
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#fef3c7'
                    }}>
                      <Assessment sx={{ color: '#f59e0b' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                        {usuarioInfo.metaVentas}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Meta de ventas
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#f0f9ff'
                    }}>
                      <AttachMoney sx={{ color: '#0369a1' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                        {resumenComisiones.comisionCalculada}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Comisión estimada
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Sección de KPIs */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#111827' }}>
              Indicadores de Desempeño
            </Typography>
            <Grid container spacing={3}>
              {kpis.map((kpi, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Card sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    height: '100%',
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 4 }
                  }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: alpha(kpi.color, 0.1)
                        }}>
                          {React.cloneElement(kpi.icon, { sx: { color: kpi.color, fontSize: 24 } })}
                        </Box>
                        {kpi.trend && (
                          <Chip 
                            label={kpi.trend}
                            size="small"
                            sx={{ 
                              bgcolor: '#dcfce7', 
                              color: '#16a34a',
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        )}
                      </Box>
                      
                      <Typography variant="h4" sx={{ fontWeight: 700, color: kpi.color, mb: 1 }}>
                        {kpi.value}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#111827' }}>
                        {kpi.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: kpi.progress ? 2 : 0 }}>
                        {kpi.subtitle}
                      </Typography>
                      
                      {kpi.progress && (
                        <Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={kpi.progress} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(kpi.color, 0.1),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: kpi.color,
                                borderRadius: 3
                              }
                            }}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              Progreso
                            </Typography>
                            <Typography variant="caption" sx={{ color: kpi.color, fontWeight: 600 }}>
                              {kpi.progress}%
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Contenido principal - 2 columnas */}
          <Grid container spacing={3}>
            {/* Columna izquierda - Tareas */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Assignment sx={{ color: '#2563eb' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Tareas Pendientes
                      </Typography>
                      <Chip 
                        label={`${tareasUsuario.filter(t => !t.completada).length} pendientes`}
                        size="small"
                        sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontWeight: 500 }}
                      />
                    </Box>
                    <Button 
                      variant="outlined" 
                      size="small"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                      onClick={() => navigate('/tareas')}
                      sx={{ borderRadius: 2 }}
                    >
                      Ver todas
                    </Button>
                  </Box>

                  <Stack spacing={2}>
                    {tareasUsuario.map((tarea) => (
                      <Paper
                        key={tarea.id}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderLeft: `4px solid ${
                            tarea.prioridad === 'alta' ? '#ef4444' : 
                            tarea.prioridad === 'media' ? '#f59e0b' : '#10b981'
                          }`,
                          bgcolor: tarea.completada ? '#f9fafb' : '#ffffff',
                          borderRadius: 1,
                          border: `1px solid ${theme.palette.divider}`,
                          '&:hover': { bgcolor: '#f8fafc' }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ mt: 0.5 }}>
                            {tarea.completada ? (
                              <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                            ) : (
                              <Box sx={{ 
                                width: 20, 
                                height: 20, 
                                border: '2px solid #9ca3af', 
                                borderRadius: '50%'
                              }} />
                            )}
                          </Box>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ 
                              fontWeight: 500, 
                              textDecoration: tarea.completada ? 'line-through' : 'none',
                              color: tarea.completada ? '#9ca3af' : '#111827',
                              mb: 1
                            }}>
                              {tarea.descripcion}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 14, color: '#6b7280' }} />
                                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                  {tarea.fecha}
                                </Typography>
                              </Box>
                              
                              <Chip 
                                label={tarea.prioridad}
                                size="small"
                                sx={{
                                  fontSize: '0.75rem',
                                  bgcolor: tarea.prioridad === 'alta' ? '#fee2e2' : 
                                          tarea.prioridad === 'media' ? '#fef3c7' : '#d1fae5',
                                  color: tarea.prioridad === 'alta' ? '#dc2626' : 
                                        tarea.prioridad === 'media' ? '#92400e' : '#065f46'
                                }}
                              />
                            </Box>
                          </Box>
                          
                          {!tarea.completada && (
                            <Button 
                              size="small" 
                              variant="contained"
                              sx={{ 
                                minWidth: 'auto', 
                                px: 2,
                                borderRadius: 1.5,
                                bgcolor: '#2563eb',
                                '&:hover': { bgcolor: '#1d4ed8' }
                              }}
                            >
                              Completar
                            </Button>
                          )}
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Columna derecha - Ventas y Comisiones */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                {/* Ventas a Crédito */}
                <Card sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CreditCard sx={{ color: '#9333ea' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Ventas a Crédito
                        </Typography>
                      </Box>
                      <Button 
                        variant="text" 
                        size="small"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        onClick={() => navigate('/ventas/credito')}
                        sx={{ fontSize: '0.75rem' }}
                      >
                        Ver todas
                      </Button>
                    </Box>

                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ py: 1, fontSize: '0.75rem', fontWeight: 600 }}>Cliente</TableCell>
                            <TableCell align="right" sx={{ py: 1, fontSize: '0.75rem', fontWeight: 600 }}>Monto</TableCell>
                            <TableCell align="right" sx={{ py: 1, fontSize: '0.75rem', fontWeight: 600 }}>Estado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ventasCredito.slice(0, 3).map((venta) => (
                            <TableRow 
                              key={venta.id} 
                              hover 
                              sx={{ '&:hover': { bgcolor: '#f8fafc' } }}
                            >
                              <TableCell sx={{ py: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {venta.cliente}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                  {venta.fecha}
                                </Typography>
                              </TableCell>
                              <TableCell align="right" sx={{ py: 1.5, fontWeight: 600 }}>
                                {venta.monto}
                              </TableCell>
                              <TableCell align="right" sx={{ py: 1.5 }}>
                                <Chip 
                                  label={venta.estado}
                                  size="small"
                                  sx={{
                                    fontSize: '0.75rem',
                                    bgcolor: venta.estado === 'Pagado' ? '#d1fae5' : '#fee2e2',
                                    color: venta.estado === 'Pagado' ? '#065f46' : '#dc2626',
                                    fontWeight: 500
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    {ventasCredito.some(v => v.estado === 'Pendiente') && (
                      <Paper sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            Total pendiente:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#dc2626' }}>
                            $21,200
                          </Typography>
                        </Box>
                      </Paper>
                    )}
                  </CardContent>
                </Card>

                {/* Comisiones */}
                <Card sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${alpha('#2563eb', 0.2)}`,
                  bgcolor: '#f0f9ff'
                }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <Payment sx={{ color: '#0369a1' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Resumen de Comisiones
                      </Typography>
                    </Box>

                    <Stack spacing={2} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>Calculada</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                          {resumenComisiones.comisionCalculada}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>Pagada</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981' }}>
                            {resumenComisiones.comisionPagada}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>Pendiente</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#f59e0b' }}>
                          {resumenComisiones.comisionPendiente}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          Progreso de pago
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0369a1' }}>
                          {Math.round((parseFloat(resumenComisiones.comisionPagada.replace(/[^0-9.-]+/g,"")) / 
                          parseFloat(resumenComisiones.comisionCalculada.replace(/[^0-9.-]+/g,""))) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(parseFloat(resumenComisiones.comisionPagada.replace(/[^0-9.-]+/g,"")) / 
                              parseFloat(resumenComisiones.comisionCalculada.replace(/[^0-9.-]+/g,""))) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: alpha('#0369a1', 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#0369a1',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 3,
            mt: 'auto',
            bgcolor: '#ffffff',
            borderTop: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
              © {new Date().getFullYear()} INFAMEX S.L.U. - Panel de Vendedor
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              Última actualización: Hoy, 10:30 AM
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}