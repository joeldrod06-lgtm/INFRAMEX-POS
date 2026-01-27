import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Chip,
  Button,
  alpha,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  People,
  LocalShipping,
  AttachMoney,
  Assessment,
  Assignment,
  CreditCard,
  CheckCircle,
  Payment,
  CalendarToday,
} from '@mui/icons-material';
import { colorPalette } from '../utils/colors';

const DashboardContent = ({
  usuarioInfo,
  tareasUsuario,
  ventasCredito,
  resumenComisiones,
  kpis,
  navigate,
}) => {
  
  const stats = [
    { 
      value: usuarioInfo.clientesActivos, 
      label: 'Clientes activos', 
      icon: <People />,
      bgColor: colorPalette.primaryLightest
    },
    { 
      value: usuarioInfo.pedidosPendientes, 
      label: 'Pedidos pendientes', 
      icon: <LocalShipping />,
      bgColor: colorPalette.primaryLightest
    },
    { 
      value: `${usuarioInfo.metaVentas}%`, 
      label: 'Meta de ventas', 
      icon: <Assessment />,
      bgColor: colorPalette.primaryLightest
    },
    { 
      value: resumenComisiones.comisionCalculada, 
      label: 'Comisión estimada', 
      icon: <AttachMoney />,
      bgColor: colorPalette.primaryLightest
    }
  ];

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          color: colorPalette.textPrimary, 
          mb: 1,
          fontSize: { xs: '1.75rem', md: '2rem' }
        }}>
          ¡Bienvenido, {usuarioInfo.nombre}!
        </Typography>
        <Typography variant="body1" sx={{ 
          color: colorPalette.textSecondary, 
          mb: 3,
          fontSize: { xs: '0.9rem', md: '1rem' }
        }}>
          Resumen completo de tus actividades y métricas de desempeño
        </Typography>
        
        {/* Estadísticas rápidas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ 
                p: 2, 
                bgcolor: colorPalette.background, 
                borderRadius: 2,
                border: `1px solid ${colorPalette.border}`,
                height: '100%',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: stat.bgColor
                  }}>
                    {React.cloneElement(stat.icon, { 
                      sx: { 
                        color: colorPalette.primary,
                        fontSize: 24
                      } 
                    })}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: colorPalette.textPrimary,
                      fontSize: '1.25rem'
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: colorPalette.textSecondary,
                      fontSize: '0.8rem'
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Sección de KPIs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          mb: 3, 
          color: colorPalette.textPrimary,
          fontSize: '1.25rem'
        }}>
          Indicadores de Desempeño
        </Typography>
        <Grid container spacing={3}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <KpiCard kpi={kpi} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contenido principal - 2 columnas */}
      <Grid container spacing={3}>
        {/* Columna izquierda - Tareas */}
        <Grid item xs={12} lg={8}>
          <TareasSection 
            tareasUsuario={tareasUsuario}
            navigate={navigate}
          />
        </Grid>

        {/* Columna derecha - Ventas y Comisiones */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            <VentasCreditoSection 
              ventasCredito={ventasCredito}
              navigate={navigate}
            />
            <ComisionesSection 
              resumenComisiones={resumenComisiones}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

// Subcomponente para KPI Cards
const KpiCard = ({ kpi }) => (
  <Card sx={{ 
    border: `1px solid ${colorPalette.border}`,
    borderRadius: 2,
    height: '100%',
    minHeight: 240,
    transition: 'all 0.2s ease',
    bgcolor: colorPalette.background,
    '&:hover': { 
      boxShadow: 4,
      transform: 'translateY(-2px)'
    }
  }}>
    <CardContent sx={{ 
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 2 
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 52,
          height: 52,
          borderRadius: 2,
          bgcolor: alpha(kpi.color, 0.1)
        }}>
          {React.cloneElement(kpi.icon, { 
            sx: { 
              color: kpi.color, 
              fontSize: 28 
            } 
          })}
        </Box>
        {kpi.trend && (
          <Chip 
            label={kpi.trend}
            size="small"
            sx={{ 
              bgcolor: '#dcfce7', 
              color: colorPalette.success,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24
            }}
          />
        )}
      </Box>
      
      <Typography variant="h4" sx={{ 
        fontWeight: 700, 
        color: kpi.color, 
        mb: 1,
        fontSize: '2rem',
        flex: 1
      }}>
        {kpi.value}
      </Typography>
      
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 1, 
        color: colorPalette.textPrimary,
        fontSize: '1.1rem'
      }}>
        {kpi.title}
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: colorPalette.textSecondary, 
        mb: kpi.progress ? 2 : 0,
        fontSize: '0.9rem'
      }}>
        {kpi.subtitle}
      </Typography>
      
      {kpi.progress && (
        <Box sx={{ mt: 'auto' }}>
          <LinearProgress 
            variant="determinate" 
            value={kpi.progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: alpha(kpi.color, 0.1),
              '& .MuiLinearProgress-bar': {
                bgcolor: kpi.color,
                borderRadius: 4
              }
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 1 
          }}>
            <Typography variant="caption" sx={{ 
              color: colorPalette.textSecondary,
              fontSize: '0.75rem'
            }}>
              Progreso
            </Typography>
            <Typography variant="caption" sx={{ 
              color: kpi.color, 
              fontWeight: 600,
              fontSize: '0.75rem'
            }}>
              {kpi.progress}%
            </Typography>
          </Box>
        </Box>
      )}
    </CardContent>
  </Card>
);

// Subcomponente para Tareas
const TareasSection = ({ tareasUsuario, navigate }) => (
  <Card sx={{ 
    borderRadius: 2, 
    border: `1px solid ${colorPalette.border}`,
    bgcolor: colorPalette.background
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Assignment sx={{ color: colorPalette.primary }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: colorPalette.textPrimary }}>
            Tareas Pendientes
          </Typography>
          <Chip 
            label={`${tareasUsuario.filter(t => !t.completada).length} pendientes`}
            size="small"
            sx={{ 
              bgcolor: colorPalette.error + '15', 
              color: colorPalette.error,
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          />
        </Box>
        <Button 
          variant="outlined" 
          size="small"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
          onClick={() => navigate('/tareas')}
          sx={{ 
            borderRadius: 2,
            borderColor: colorPalette.border,
            color: colorPalette.textPrimary,
            '&:hover': {
              borderColor: colorPalette.primary,
              bgcolor: colorPalette.primaryLightest
            }
          }}
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
                tarea.prioridad === 'alta' ? colorPalette.error : 
                tarea.prioridad === 'media' ? colorPalette.warning : colorPalette.success
              }`,
              bgcolor: tarea.completada ? colorPalette.surface : colorPalette.background,
              borderRadius: 1,
              border: `1px solid ${colorPalette.border}`,
              '&:hover': { 
                bgcolor: colorPalette.hoverBg,
                transform: 'translateX(2px)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ mt: 0.5 }}>
                {tarea.completada ? (
                  <CheckCircle sx={{ 
                    color: colorPalette.success, 
                    fontSize: 20 
                  }} />
                ) : (
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    border: `2px solid ${colorPalette.textSecondary}`, 
                    borderRadius: '50%'
                  }} />
                )}
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontWeight: 500, 
                  textDecoration: tarea.completada ? 'line-through' : 'none',
                  color: tarea.completada ? colorPalette.textSecondary : colorPalette.textPrimary,
                  mb: 1,
                  fontSize: '0.95rem'
                }}>
                  {tarea.descripcion}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  flexWrap: 'wrap' 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday sx={{ 
                      fontSize: 14, 
                      color: colorPalette.textSecondary 
                    }} />
                    <Typography variant="caption" sx={{ 
                      color: colorPalette.textSecondary,
                      fontSize: '0.75rem'
                    }}>
                      {tarea.fecha}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={tarea.prioridad}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      height: 20,
                      bgcolor: tarea.prioridad === 'alta' ? 
                              colorPalette.error + '15' : 
                              tarea.prioridad === 'media' ? 
                              colorPalette.warning + '15' : 
                              colorPalette.success + '15',
                      color: tarea.prioridad === 'alta' ? 
                            colorPalette.error : 
                            tarea.prioridad === 'media' ? 
                            colorPalette.warning : 
                            colorPalette.success
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
                    bgcolor: colorPalette.primary,
                    fontSize: '0.75rem',
                    '&:hover': { 
                      bgcolor: colorPalette.primaryLight 
                    }
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
);

// Subcomponente para Ventas a Crédito
const VentasCreditoSection = ({ ventasCredito, navigate }) => {
  const ventasPendientes = ventasCredito.filter(v => v.estado === 'Pendiente');
  const totalPendiente = ventasPendientes.reduce((acc, venta) => {
    const monto = parseFloat(venta.monto.replace(/[^0-9.-]+/g, ""));
    return acc + monto;
  }, 0);

  return (
    <Card sx={{ 
      borderRadius: 2, 
      border: `1px solid ${colorPalette.border}`,
      bgcolor: colorPalette.background
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCard sx={{ color: colorPalette.primary }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: colorPalette.textPrimary
            }}>
              Ventas a Crédito
            </Typography>
          </Box>
          <Button 
            variant="text" 
            size="small"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate('/ventas/credito')}
            sx={{ 
              fontSize: '0.75rem',
              color: colorPalette.primary,
              '&:hover': {
                bgcolor: colorPalette.primaryLightest
              }
            }}
          >
            Ver todas
          </Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  py: 1, 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  color: colorPalette.textPrimary
                }}>
                  Cliente
                </TableCell>
                <TableCell align="right" sx={{ 
                  py: 1, 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  color: colorPalette.textPrimary
                }}>
                  Monto
                </TableCell>
                <TableCell align="right" sx={{ 
                  py: 1, 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  color: colorPalette.textPrimary
                }}>
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventasCredito.slice(0, 3).map((venta) => (
                <TableRow 
                  key={venta.id} 
                  hover 
                  sx={{ 
                    '&:hover': { 
                      bgcolor: colorPalette.hoverBg 
                    } 
                  }}
                >
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500,
                      color: colorPalette.textPrimary
                    }}>
                      {venta.cliente}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: colorPalette.textSecondary,
                      fontSize: '0.7rem'
                    }}>
                      {venta.fecha}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    py: 1.5, 
                    fontWeight: 600,
                    color: colorPalette.textPrimary
                  }}>
                    {venta.monto}
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.5 }}>
                    <Chip 
                      label={venta.estado}
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        height: 22,
                        bgcolor: venta.estado === 'Pagado' ? 
                                colorPalette.success + '15' : 
                                colorPalette.error + '15',
                        color: venta.estado === 'Pagado' ? 
                              colorPalette.success : 
                              colorPalette.error,
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {ventasPendientes.length > 0 && (
          <Paper sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: colorPalette.surface, 
            borderRadius: 1,
            border: `1px solid ${colorPalette.border}`
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Typography variant="body2" sx={{ 
                color: colorPalette.textSecondary,
                fontSize: '0.85rem'
              }}>
                Total pendiente:
              </Typography>
              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                color: colorPalette.error,
                fontSize: '0.85rem'
              }}>
                ${totalPendiente.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

// Subcomponente para Comisiones
const ComisionesSection = ({ resumenComisiones }) => {
  const calcularProgreso = () => {
    const pagada = parseFloat(resumenComisiones.comisionPagada.replace(/[^0-9.-]+/g, ""));
    const calculada = parseFloat(resumenComisiones.comisionCalculada.replace(/[^0-9.-]+/g, ""));
    return calculada > 0 ? Math.round((pagada / calculada) * 100) : 0;
  };

  return (
    <Card sx={{ 
      borderRadius: 2,
      border: `1px solid ${alpha(colorPalette.primary, 0.2)}`,
      bgcolor: colorPalette.primaryLightest
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 3 
        }}>
          <Payment sx={{ color: colorPalette.primary }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            color: colorPalette.textPrimary
          }}>
            Resumen de Comisiones
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Calculada', value: resumenComisiones.comisionCalculada, color: colorPalette.textPrimary },
            { label: 'Pagada', value: resumenComisiones.comisionPagada, color: colorPalette.success, icon: <CheckCircle /> },
            { label: 'Pendiente', value: resumenComisiones.comisionPendiente, color: colorPalette.warning }
          ].map((item, idx) => (
            <Box key={idx} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Typography variant="body2" sx={{ 
                color: colorPalette.textSecondary,
                fontSize: '0.9rem'
              }}>
                {item.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon && React.cloneElement(item.icon, { 
                  sx: { 
                    fontSize: 16, 
                    color: item.color 
                  } 
                })}
                <Typography variant="body2" sx={{ 
                  fontWeight: 600, 
                  color: item.color,
                  fontSize: '0.9rem'
                }}>
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ 
          my: 2,
          borderColor: alpha(colorPalette.border, 0.5)
        }} />
        
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 1 
          }}>
            <Typography variant="body2" sx={{ 
              color: colorPalette.textSecondary,
              fontSize: '0.9rem'
            }}>
              Progreso de pago
            </Typography>
            <Typography variant="body2" sx={{ 
              fontWeight: 600, 
              color: colorPalette.primary,
              fontSize: '0.9rem'
            }}>
              {calcularProgreso()}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={calcularProgreso()} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: alpha(colorPalette.primary, 0.1),
              '& .MuiLinearProgress-bar': {
                bgcolor: colorPalette.primary,
                borderRadius: 4
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;