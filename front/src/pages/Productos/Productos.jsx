import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Stack,
  Tooltip,
  IconButton,
  Badge,
  Divider,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Search,
  FilterList,
  Warning,
  Error,
  CheckCircle,
  Category,
  LocalOffer,
  Inventory,
  Report,
  Download,
  Email,
  Print,
  Star,
  Speed,
  RemoveRedEye,
  LowPriority,
  TrendingUp,
  TrendingDown,
  Info,
  MoreVert,
  Add,
  Sort,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';
import { keyframes } from '@mui/system';

// Animaciones sutiles
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const productosMock = [
  { id: 1, nombre: 'Cemento Gris 50kg', categoria: 'Construcción', stock: 120, precio: 215, codigo: 'CEM-001', ubicacion: 'Bodega A', demanda: 'alta', tendencia: 'up' },
  { id: 2, nombre: 'Varilla 3/8"', categoria: 'Acero', stock: 35, precio: 98, codigo: 'VAR-038', ubicacion: 'Bodega B', demanda: 'media', tendencia: 'stable' },
  { id: 3, nombre: 'Arena Lavada (m³)', categoria: 'Agregados', stock: 0, precio: 420, codigo: 'ARE-001', ubicacion: 'Bodega C', demanda: 'baja', tendencia: 'down' },
  { id: 4, nombre: 'Block Hueco 15x20x40', categoria: 'Construcción', stock: 500, precio: 12.5, codigo: 'BLO-001', ubicacion: 'Bodega A', demanda: 'alta', tendencia: 'up' },
  { id: 5, nombre: 'Pegazulejo 20kg', categoria: 'Adhesivos', stock: 25, precio: 185, codigo: 'PEG-001', ubicacion: 'Bodega B', demanda: 'media', tendencia: 'stable' },
  { id: 6, nombre: 'Pintura Vinil Blanca 4L', categoria: 'Pinturas', stock: 18, precio: 320, codigo: 'PIN-001', ubicacion: 'Bodega C', demanda: 'alta', tendencia: 'up' },
  { id: 7, nombre: 'Tubería PVC 1/2"', categoria: 'Plomería', stock: 5, precio: 45, codigo: 'TUB-012', ubicacion: 'Bodega B', demanda: 'media', tendencia: 'down' },
  { id: 8, nombre: 'Cable THHN 12 AWG', categoria: 'Eléctrico', stock: 150, precio: 85, codigo: 'CAB-012', ubicacion: 'Bodega A', demanda: 'alta', tendencia: 'up' },
  { id: 9, nombre: 'Ladrillo Rojo', categoria: 'Construcción', stock: 1000, precio: 8.5, codigo: 'LAD-001', ubicacion: 'Bodega C', demanda: 'media', tendencia: 'stable' },
  { id: 10, nombre: 'Yeso 25kg', categoria: 'Acabados', stock: 45, precio: 95, codigo: 'YES-001', ubicacion: 'Bodega B', demanda: 'baja', tendencia: 'down' },
  { id: 11, nombre: 'Malla Electrosoldada', categoria: 'Construcción', stock: 3, precio: 285, codigo: 'MAL-001', ubicacion: 'Bodega A', demanda: 'alta', tendencia: 'up' },
  { id: 12, nombre: 'Impermeabilizante', categoria: 'Protección', stock: 0, precio: 650, codigo: 'IMP-001', ubicacion: 'Bodega C', demanda: 'media', tendencia: 'stable' },
];

const getEstadoInventario = (stock) => {
  if (stock === 0) return { 
    label: 'AGOTADO', 
    color: 'error', 
    icon: <Error fontSize="small" />,
    bgColor: 'rgba(220, 38, 38, 0.08)',
    textColor: '#dc2626',
    borderColor: 'rgba(220, 38, 38, 0.2)'
  };
  if (stock <= 5) return { 
    label: 'BAJO STOCK', 
    color: 'warning', 
    icon: <Warning fontSize="small" />,
    bgColor: 'rgba(245, 158, 11, 0.08)',
    textColor: '#d97706',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  };
  return { 
    label: 'DISPONIBLE', 
    color: 'success', 
    icon: <CheckCircle fontSize="small" />,
    bgColor: 'rgba(16, 185, 129, 0.08)',
    textColor: '#059669',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  };
};

const FILTROS = [
  { label: 'TODOS', value: 'TODOS', icon: <FilterList /> },
  { label: 'DISPONIBLE', value: 'DISPONIBLE', color: 'success' },
  { label: 'BAJO STOCK', value: 'BAJO STOCK', color: 'warning' },
  { label: 'AGOTADO', value: 'AGOTADO', color: 'error' },
];

const CategoriaChip = ({ categoria }) => {
  const coloresCategoria = {
    'Construcción': { bg: 'rgba(30, 64, 175, 0.1)', text: '#1e40af', icon: '🏗️' },
    'Acero': { bg: 'rgba(55, 65, 81, 0.1)', text: '#374151', icon: '⚙️' },
    'Agregados': { bg: 'rgba(146, 64, 14, 0.1)', text: '#92400e', icon: '🪨' },
    'Adhesivos': { bg: 'rgba(79, 70, 229, 0.1)', text: '#4f46e5', icon: '🧴' },
    'Pinturas': { bg: 'rgba(190, 24, 93, 0.1)', text: '#be185d', icon: '🎨' },
    'Plomería': { bg: 'rgba(14, 116, 144, 0.1)', text: '#0e7490', icon: '🚿' },
    'Eléctrico': { bg: 'rgba(161, 98, 7, 0.1)', text: '#a16207', icon: '⚡' },
    'Acabados': { bg: 'rgba(87, 83, 78, 0.1)', text: '#57534e', icon: '✨' },
    'Protección': { bg: 'rgba(22, 101, 52, 0.1)', text: '#166534', icon: '🛡️' },
  };

  const color = coloresCategoria[categoria] || { bg: 'rgba(102, 102, 102, 0.1)', text: '#666666', icon: '📦' };

  return (
    <Chip
      label={<Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {color.icon} {categoria}
      </Box>}
      size="small"
      sx={{
        backgroundColor: color.bg,
        color: color.text,
        fontWeight: 500,
        fontSize: '0.7rem',
        borderRadius: '12px',
        height: '24px',
        '& .MuiChip-label': { px: 1.2 }
      }}
    />
  );
};

const ProductoCard = ({ producto }) => {
  const estado = getEstadoInventario(producto.stock);
  const [isHovered, setIsHovered] = useState(false);

  const getTendenciaIcon = (tendencia) => {
    switch(tendencia) {
      case 'up': return <TrendingUp sx={{ fontSize: 14, color: '#10b981' }} />;
      case 'down': return <TrendingDown sx={{ fontSize: 14, color: '#ef4444' }} />;
      default: return <span style={{ color: '#6b7280', fontSize: '14px' }}>●</span>;
    }
  };

  const getDemandaColor = (demanda) => {
    switch(demanda) {
      case 'alta': return '#10b981';
      case 'media': return '#f59e0b';
      case 'baja': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: producto.id * 50 }}>
      <Card
        elevation={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: isHovered ? '#3b82f6' : '#e5e7eb',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          animation: `${fadeIn} 0.5s ease-out`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${estado.textColor}, transparent)`,
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {/* Header con estado y código */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Badge
              variant="dot"
              invisible={estado.label !== 'BAJO STOCK' && estado.label !== 'AGOTADO'}
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: estado.textColor,
                  width: 10,
                  height: 10,
                  top: 5,
                  right: 5,
                }
              }}
            >
              <Chip
                label={estado.label}
                size="small"
                icon={estado.icon}
                sx={{
                  backgroundColor: estado.bgColor,
                  color: estado.textColor,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  borderRadius: '10px',
                  height: '22px',
                  border: `1px solid ${estado.borderColor}`,
                }}
              />
            </Badge>
            
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontFamily: 'Menlo, Monaco, Consolas, monospace',
              fontSize: '0.7rem',
              backgroundColor: '#f8fafc',
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              {producto.codigo}
            </Typography>
          </Stack>

          {/* Nombre del producto */}
          <Typography 
            variant="subtitle2" 
            fontWeight={600} 
            gutterBottom
            sx={{ 
              lineHeight: 1.3,
              minHeight: '2.6em',
              fontSize: '0.875rem',
              color: estado.label === 'AGOTADO' ? '#9ca3af' : '#1f2937',
              transition: 'color 0.2s',
            }}
          >
            {producto.nombre}
          </Typography>

          <Divider sx={{ my: 2, borderColor: '#f3f4f6' }} />

          {/* Información detallada */}
          <Stack spacing={1.8}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Category sx={{ fontSize: 16, color: '#9ca3af' }} />
                <CategoriaChip categoria={producto.categoria} />
              </Box>
              {getTendenciaIcon(producto.tendencia)}
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Inventory sx={{ fontSize: 16, color: '#9ca3af' }} />
                <Typography variant="caption" color="text.secondary">
                  Stock:
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                fontWeight={600}
                sx={{ 
                  color: estado.label === 'AGOTADO' ? '#ef4444' : 
                         estado.label === 'BAJO STOCK' ? '#f59e0b' : '#059669',
                  fontSize: '0.875rem'
                }}
              >
                {producto.stock.toLocaleString()} uds.
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalOffer sx={{ fontSize: 16, color: '#9ca3af' }} />
                <Typography variant="caption" color="text.secondary">
                  Precio:
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: '#059669', fontSize: '0.875rem' }}>
                ${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LowPriority sx={{ fontSize: 16, color: '#9ca3af' }} />
                <Typography variant="caption" color="text.secondary">
                  Ubicación:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" sx={{ 
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  backgroundColor: '#f8fafc',
                  px: 1,
                  py: 0.3,
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0'
                }}>
                  {producto.ubicacion}
                </Typography>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: getDemandaColor(producto.demanda),
                  border: '1px solid white',
                  boxShadow: '0 0 0 1px #e5e7eb'
                }} />
              </Box>
            </Stack>
          </Stack>

          {/* Botón de acción sutil */}
          {isHovered && (
            <Fade in={isHovered}>
              <Box sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                p: 0.5
              }}>
                <IconButton size="small">
                  <MoreVert sx={{ fontSize: 16, color: '#6b7280' }} />
                </IconButton>
              </Box>
            </Fade>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );
};

const ReporteMenu = ({ productosAgotados, productosPorTerminar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Generar reporte de inventario">
        <Button
          variant="contained"
          startIcon={<Report />}
          onClick={handleClick}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            px: 2.5,
            backgroundColor: '#1f2937',
            color: 'white',
            '&:hover': { 
              backgroundColor: '#374151',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(31, 41, 55, 0.2)',
            },
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(31, 41, 55, 0.1)',
          }}
        >
          Reporte
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: 200,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            mt: 1,
          }
        }}
      >
        <MenuItem onClick={handleClose} sx={{ borderRadius: '8px', m: 0.5 }}>
          <ListItemIcon>
            <Print fontSize="small" />
          </ListItemIcon>
          Imprimir Reporte
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ borderRadius: '8px', m: 0.5 }}>
          <ListItemIcon>
            <Email fontSize="small" />
          </ListItemIcon>
          Enviar por Email
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ borderRadius: '8px', m: 0.5 }}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          Descargar CSV
        </MenuItem>
      </Menu>
    </>
  );
};

export default function CatalogoMateriales() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('TODOS');

  const productosFiltrados = productosMock.filter((producto) => {
    const estado = getEstadoInventario(producto.stock);
    const coincideFiltro = 
      filtro === 'TODOS' || 
      filtro === estado.label;
    
    const coincideBusqueda = 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(busqueda.toLowerCase());

    return coincideFiltro && coincideBusqueda;
  });

  const productosAgotados = productosMock.filter(p => p.stock === 0);
  const productosPorTerminar = productosMock.filter(p => p.stock > 0 && p.stock <= 5);
  const productosDisponibles = productosMock.filter(p => p.stock > 5);

  const totalCriticos = productosAgotados.length + productosPorTerminar.length;

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <Sidebar />

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, md: 3 },
        maxWidth: 'calc(100vw - 280px)'
      }}>
        {/* Header estilo Apple */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h4" fontWeight={600} sx={{ 
                color: '#111827',
                mb: 1,
                letterSpacing: '-0.025em',
              }}>
                Catálogo de Materiales
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '0.95rem' }}>
                Gestión completa del inventario en tiempo real
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Vista rápida">
                <IconButton sx={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  '&:hover': { 
                    backgroundColor: '#f8fafc',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}>
                  <Speed sx={{ color: '#6b7280', fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              
              <ReporteMenu 
                productosAgotados={productosAgotados}
                productosPorTerminar={productosPorTerminar}
              />
            </Stack>
          </Stack>

          {/* Tarjetas de métricas */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2.5}>
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle sx={{ color: '#10b981', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      DISPONIBLES
                    </Typography>
                    <Typography variant="h3" fontWeight={700} sx={{ color: '#111827' }}>
                      {productosDisponibles.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2.5}>
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Warning sx={{ color: '#f59e0b', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      BAJO STOCK
                    </Typography>
                    <Typography variant="h3" fontWeight={700} sx={{ color: '#111827' }}>
                      {productosPorTerminar.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2.5}>
                  <Box sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Error sx={{ color: '#ef4444', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      AGOTADOS
                    </Typography>
                    <Typography variant="h3" fontWeight={700} sx={{ color: '#111827' }}>
                      {productosAgotados.length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Barra de búsqueda y filtros */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'white',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems="center">
            <TextField
              fullWidth
              placeholder="Buscar por nombre, categoría o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#f9fafb',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  }
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: '0.95rem',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {FILTROS.map((filtroItem) => (
                <Chip
                  key={filtroItem.value}
                  label={filtroItem.label}
                  clickable
                  variant={filtro === filtroItem.value ? 'filled' : 'outlined'}
                  color={filtroItem.color || 'default'}
                  onClick={() => setFiltro(filtroItem.value)}
                  sx={{
                    fontWeight: 500,
                    borderRadius: '24px',
                    fontSize: '0.75rem',
                    height: '32px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    }
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>

        {/* Contador de resultados */}
        <Typography variant="subtitle2" sx={{ 
          color: '#6b7280', 
          mb: 3,
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Inventory sx={{ fontSize: 16 }} />
          {productosFiltrados.length} materiales encontrados
          {filtro !== 'TODOS' && (
            <Chip 
              label={filtro} 
              size="small" 
              sx={{ 
                fontSize: '0.7rem',
                height: '20px',
                ml: 1 
              }} 
            />
          )}
        </Typography>

        {/* Grid de productos */}
        {productosFiltrados.length > 0 ? (
          <Grid container spacing={2.5}>
            {productosFiltrados.map((producto) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
                <ProductoCard producto={producto} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '14px',
              border: '1px solid #e5e7eb',
              animation: `${fadeIn} 0.5s ease-out`,
            }}
          >
            <Search sx={{ 
              fontSize: 56, 
              color: '#d1d5db', 
              mb: 3,
              opacity: 0.8 
            }} />
            <Typography variant="h6" sx={{ color: '#374151', mb: 1, fontWeight: 600 }}>
              No se encontraron materiales
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af', maxWidth: 400, mx: 'auto' }}>
              Intenta con otros términos de búsqueda o ajusta los filtros aplicados
            </Typography>
          </Paper>
        )}

        {/* Alerta de inventario crítico */}
        {productosFiltrados.length > 0 && totalCriticos > 0 && (
          <Fade in={totalCriticos > 0}>
            <Paper
              elevation={0}
              sx={{
                mt: 4,
                p: 2.5,
                backgroundColor: totalCriticos > 2 ? 'rgba(245, 158, 11, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                borderRadius: '12px',
                border: `1px solid ${totalCriticos > 2 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                animation: `${fadeIn} 0.5s ease-out`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  p: 1.5, 
                  backgroundColor: totalCriticos > 2 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Warning sx={{ 
                    color: totalCriticos > 2 ? '#f59e0b' : '#3b82f6',
                    fontSize: 20 
                  }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, mb: 0.5 }}>
                    {totalCriticos} materiales requieren atención inmediata
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    {productosAgotados.length > 0 && ` ${productosAgotados.length} agotados`}
                    {productosPorTerminar.length > 0 && ` • ${productosPorTerminar.length} con bajo stock`}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Box>
    </Box>
  );
}