import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Stack, Divider, LinearProgress, Chip, Button, alpha, IconButton } from '@mui/material';
import { ArrowForward, Assignment, CreditCard, CheckCircle, Payment, CalendarToday, MoreVert, TrendingUp, TrendingDown, ShoppingCart, Speed, ArrowUpward } from '@mui/icons-material';

const DashboardContent = ({ usuarioInfo, tareasUsuario, ventasCredito, resumenComisiones, kpis, estadisticasRapidas, navigate }) => {
  
  const ventasRecientes = [
    { cliente: 'ElectroCom S.A.', monto: '$2,450', fecha: 'Hoy, 09:30', metodo: 'Tarjeta' },
    { cliente: 'TecnoSoluciones', monto: '$1,850', fecha: 'Hoy, 11:15', metodo: 'Efectivo' },
    { cliente: 'Comercial MX', monto: '$3,200', fecha: 'Ayer, 16:45', metodo: 'Transferencia' },
  ];

  const estadosSistema = [
    { label: 'Conexión POS', status: 'online', color: 'success' },
  ];

  const tareasPendientes = tareasUsuario.filter(t => !t.completada).length;

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Hola, {usuarioInfo.nombre}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Resumen de operaciones y métricas de desempeño
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem', display: { xs: 'none', sm: 'block' } }}>
            Actualizado hoy • 10:30 AM
          </Typography>
        </Box>
        
        {/* Estadísticas rápidas */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {estadisticasRapidas.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard stat={stat} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* KPIs - Mejorado el espaciado */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: 'text.primary', 
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            mb: 0,
            letterSpacing: '0.5px'
          }}>
            <h4>Indicadores Clave</h4>
          </Typography>
          <Button 
            variant="text" 
            size="small" 
            endIcon={<ArrowForward sx={{ fontSize: 16 }} />} 
            onClick={() => navigate('/analytics')}
            sx={{ 
              fontSize: '0.75rem', 
              color: 'primary.600', 
              textTransform: 'none',
              '&:hover': { bgcolor: 'primary.50' }
            }}
          >
            Ver reporte completo
          </Button>
        </Box>
        <Grid container spacing={2.5}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <KpiCard kpi={kpi} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tareas y Ventas - Columna izquierda */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Tareas */}
            <Card sx={{ 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider', 
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Assignment sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.125rem' }}>
                      Actividades Pendientes
                    </Typography>
                    <Chip 
                      label={tareasPendientes} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.50', 
                        color: 'primary.600', 
                        fontWeight: 600, 
                        fontSize: '0.75rem', 
                        height: 24 
                      }} 
                    />
                  </Box>
                  <Button 
                    variant="text" 
                    size="small" 
                    endIcon={<ArrowForward sx={{ fontSize: 16 }} />} 
                    onClick={() => navigate('/tareas')}
                    sx={{ 
                      fontSize: '0.75rem', 
                      color: 'primary.600', 
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'primary.50' }
                    }}
                  >
                    Ver todas
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  {tareasUsuario.slice(0, 6).map((tarea) => (
                    <Grid item xs={12} sm={6} lg={4} key={tarea.id}>
                      <TareaItem tarea={tarea} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            
            {/* Ventas Recientes */}
            <Card sx={{ 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider', 
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingCart sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.125rem' }}>
                      Ventas Recientes
                    </Typography>
                  </Box>
                  <Button 
                    variant="text" 
                    size="small" 
                    endIcon={<ArrowForward sx={{ fontSize: 16 }} />} 
                    onClick={() => navigate('/ventas')}
                    sx={{ 
                      fontSize: '0.75rem', 
                      color: 'primary.600', 
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'primary.50' }
                    }}
                  >
                    Ver todas
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  {ventasRecientes.map((venta, idx) => (
                    <Grid item xs={12} sm={6} lg={4} key={idx}>
                      <VentaItem venta={venta} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Columna derecha - LAS 3 TARJETAS EN LÍNEA HORIZONTAL - ESTIRADAS */}
        <Grid item xs={12} lg={4}>
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 600, 
            color: 'text.secondary', 
            mb: 3,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Resumen de Estado
          </Typography>
          
          {/* Contenedor con las 3 tarjetas en horizontal - ESTIRADAS */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            width: '100%',
            minHeight: 300,
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}>
            {/* Crédito Pendiente - ESTIRADO */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0,
              display: 'flex',
            }}>
              <Card sx={{ 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                bgcolor: 'background.paper', 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
              }}>
                <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <CreditCard sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: 'text.primary', 
                          fontSize: '1rem',
                          lineHeight: 1.2
                        }}>
                          Crédito Pendiente
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.75rem', 
                        display: 'block',
                        lineHeight: 1.2
                      }}>
                        Pago diferido
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: 'text.disabled', 
                        mt: -0.5,
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Stack spacing={1.5} sx={{ mb: 2 }}>
                      {ventasCredito.slice(0, 3).map((venta, index) => (
                        <Box 
                          key={venta.id} 
                          sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1.2,
                            borderRadius: 1,
                            bgcolor: index % 2 === 0 ? 'action.hover' : 'transparent'
                          }}
                        >
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ 
                              fontWeight: 600, 
                              color: 'text.primary', 
                              fontSize: '0.85rem',
                              lineHeight: 1.2,
                              mb: 0.3,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {venta.cliente}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              color: 'text.secondary', 
                              fontSize: '0.7rem',
                              lineHeight: 1.2
                            }}>
                              {venta.fecha}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ textAlign: 'right', ml: 1, flexShrink: 0 }}>
                            <Typography sx={{ 
                              fontWeight: 700, 
                              color: 'text.primary', 
                              fontSize: '0.85rem',
                              lineHeight: 1.2,
                              mb: 0.3
                            }}>
                              {venta.monto}
                            </Typography>
                            <Chip 
                              label={venta.estado} 
                              size="small" 
                              sx={{ 
                                fontSize: '0.65rem', 
                                height: 18, 
                                minWidth: 60,
                                bgcolor: venta.estado === 'Pagado' ? 'success.50' : 'error.50',
                                color: venta.estado === 'Pagado' ? 'success.600' : 'error.600',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: venta.estado === 'Pagado' ? 'success.100' : 'error.100'
                              }} 
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ 
                        p: 1.2, 
                        bgcolor: 'error.50', 
                        borderRadius: 1, 
                        border: '1px solid', 
                        borderColor: 'error.100'
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ 
                            color: 'error.700', 
                            fontWeight: 600, 
                            fontSize: '0.75rem'
                          }}>
                            Total Pendiente:
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            fontWeight: 700, 
                            color: 'error.700', 
                            fontSize: '0.75rem'
                          }}>
                            $21,200
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Comisiones - ESTIRADO */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0,
              display: 'flex',
            }}>
              <Card sx={{ 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'primary.200', 
                bgcolor: 'primary.50', 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': { boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)' }
              }}>
                <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Payment sx={{ color: 'primary.600', fontSize: 20 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: 'text.primary', 
                        fontSize: '1rem',
                        lineHeight: 1.2 
                      }}>
                        Comisiones
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}>
                        Resumen Mensual
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Stack spacing={1.2} sx={{ mb: 2 }}>
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.2,
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'primary.100'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <TrendingUp sx={{ fontSize: 13, color: 'text.primary' }} />
                          <Typography variant="body2" sx={{ 
                            color: 'text.secondary', 
                            fontSize: '0.75rem', 
                            fontWeight: 500,
                            lineHeight: 1.2
                          }}>
                            Calculada
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          color: 'text.primary', 
                          fontSize: '0.85rem',
                          lineHeight: 1.2
                        }}>
                          $4,635
                        </Typography>
                      </Box>

                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.2,
                        borderRadius: 1,
                        bgcolor: 'transparent'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <CheckCircle sx={{ fontSize: 13, color: 'success.main' }} />
                          <Typography variant="body2" sx={{ 
                            color: 'text.secondary', 
                            fontSize: '0.75rem', 
                            fontWeight: 500,
                            lineHeight: 1.2
                          }}>
                            Pagado
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          color: 'success.main', 
                          fontSize: '0.85rem',
                          lineHeight: 1.2
                        }}>
                          $2,950
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px dashed', borderColor: 'primary.200' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.7rem',
                        lineHeight: 1.2
                      }}>
                        Estado
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <ArrowUpward sx={{ fontSize: 11, color: 'success.main' }} />
                        <Typography variant="caption" sx={{ 
                          fontWeight: 600, 
                          color: 'success.main', 
                          fontSize: '0.7rem',
                          lineHeight: 1.2
                        }}>
                          Arriba
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.7rem',
                        lineHeight: 1.2
                      }}>
                        Tendencia
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <ArrowUpward sx={{ fontSize: 11, color: 'success.main' }} />
                        <Typography variant="caption" sx={{ 
                          fontWeight: 600, 
                          color: 'success.main', 
                          fontSize: '0.7rem',
                          lineHeight: 1.2
                        }}>
                          Arriba
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Estado del Sistema - ESTIRADO */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0,
              display: 'flex',
            }}>
              <Card sx={{ 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                bgcolor: 'background.paper', 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
              }}>
                <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Speed sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: 'text.primary', 
                      fontSize: '1rem',
                      lineHeight: 1.2
                    }}>
                      Estado del Sistema
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: 'action.hover',
                      width: '100%',
                      mb: 1.5
                    }}>
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        lineHeight: 1.2
                      }}>
                        Conexión POS
                      </Typography>
                      <Chip 
                        label="Online"
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 22,
                          minWidth: 55,
                          bgcolor: 'success.50',
                          color: 'success.600',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          border: '1px solid',
                          borderColor: 'success.100'
                        }}
                      />
                    </Box>
                    
                    <Typography variant="caption" sx={{ 
                      color: 'text.secondary', 
                      fontSize: '0.7rem',
                      display: 'block',
                      mb: 1,
                      textAlign: 'center',
                      width: '100%'
                    }}>
                      Sistema operativo estable
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary', 
                        fontSize: '0.7rem',
                        display: 'block'
                      }}>
                        Última verificación:
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 500, 
                        color: 'text.primary', 
                        fontSize: '0.7rem'
                      }}>
                        Hoy 10:15 AM
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

// Componentes auxiliares optimizados (manteniendo los mismos)
const StatCard = ({ stat }) => (
  <Paper sx={{ p: 2.5, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%',
    position: 'relative', overflow: 'hidden', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
    <Box sx={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, bgcolor: alpha(stat.bgColor, 0.1), borderRadius: '0 0 0 60px' }} />
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor }}>
        {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 24 } })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.5rem', lineHeight: 1.2, mb: 0.5 }}>
          {stat.value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 1 }}>{stat.label}</Typography>
        {stat.trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {stat.trend.direction === 'up' ? <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} /> : <TrendingDown sx={{ fontSize: 14, color: 'error.main' }} />}
            <Typography variant="caption" sx={{ color: stat.trend.direction === 'up' ? 'success.main' : 'error.main', fontWeight: 500, fontSize: '0.75rem' }}>
              {stat.trend.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>vs. mes anterior</Typography>
          </Box>
        )}
      </Box>
    </Box>
  </Paper>
);

const KpiCard = ({ kpi }) => (
  <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%', minHeight: 170, transition: 'all 0.2s ease',
    bgcolor: 'background.paper', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' } }}>
    <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {kpi.title}
        </Typography>
        <IconButton size="small" sx={{ color: 'text.disabled', p: 0.5, '&:hover': { bgcolor: 'action.hover' } }}><MoreVert fontSize="small" /></IconButton>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: kpi.color, mb: 1, fontSize: '2rem', lineHeight: 1 }}>{kpi.value}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.85rem', lineHeight: 1.3 }}>{kpi.subtitle}</Typography>
        {kpi.progress && (
          <Box>
            <LinearProgress variant="determinate" value={kpi.progress} sx={{ height: 6, borderRadius: 3, bgcolor: alpha(kpi.color, 0.1),
              '& .MuiLinearProgress-bar': { bgcolor: kpi.color, borderRadius: 3 } }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>Progreso</Typography>
              <Typography variant="caption" sx={{ color: kpi.color, fontWeight: 600, fontSize: '0.7rem' }}>{kpi.progress}%</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

const TareaItem = ({ tarea }) => (
  <Paper elevation={0} sx={{ p: 1.5, bgcolor: tarea.completada ? 'action.hover' : 'background.paper', borderRadius: 1.5,
    border: '1px solid', borderColor: tarea.completada ? 'divider' : 'divider', height: '100%',
    '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.200' } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Box sx={{ mt: 0.25 }}>
          {tarea.completada ? <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} /> :
            <Box sx={{ width: 16, height: 16, border: '2px solid', borderColor: 'text.secondary', borderRadius: '50%' }} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 500, textDecoration: tarea.completada ? 'line-through' : 'none',
            color: tarea.completada ? 'text.disabled' : 'text.primary', mb: 0.5, fontSize: '0.85rem', lineHeight: 1.3 }}>
            {tarea.descripcion}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarToday sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{tarea.fecha.split(',')[0]}</Typography>
        </Box>
        <Chip label={tarea.prioridad} size="small" sx={{ fontSize: '0.65rem', height: 18,
          bgcolor: tarea.prioridad === 'alta' ? 'error.50' : tarea.prioridad === 'media' ? 'warning.50' : 'success.50',
          color: tarea.prioridad === 'alta' ? 'error.600' : tarea.prioridad === 'media' ? 'warning.600' : 'success.600',
          border: '1px solid', borderColor: tarea.prioridad === 'alta' ? 'error.100' : tarea.prioridad === 'media' ? 'warning.100' : 'success.100' }} />
      </Box>
    </Box>
  </Paper>
);

const VentaItem = ({ venta }) => (
  <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 1.5, border: '1px solid',
    borderColor: 'divider', height: '100%', '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.200' } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.9rem', mb: 0.5, lineHeight: 1.2 }}>{venta.cliente}</Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 1, lineHeight: 1.2 }}>{venta.fecha}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 'auto' }}>
        <Chip label={venta.metodo} size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: 'primary.50', color: 'primary.600', fontWeight: 500 }} />
        <Typography sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.95rem' }}>{venta.monto}</Typography>
      </Box>
    </Box>
  </Paper>
);

export default DashboardContent;