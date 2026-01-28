// POSInframex.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Divider,
  Tab,
  Tabs,
  Tooltip,
  Alert,
  Snackbar,
  alpha,
  LinearProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  Add,
  Remove,
  Delete,
  Receipt,
  Print,
  CreditCard,
  Money,
  Inventory,
  LocalShipping,
  Person,
  QrCodeScanner,
  Save,
  Restore,
  PictureAsPdf,
  AttachMoney,
  ShoppingCart,
  Close,
  Scale,
  PendingActions,
  History,
  TrendingUp
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos de ejemplo para materiales
const materialesInframex = [
  {
    id: 1,
    codigo: 'AC-001',
    nombre: 'Varilla Corrugada 3/8"',
    descripcion: 'Varilla de acero corrugado grado 42, 12 metros',
    precio: 185.50,
    precioPorKg: 22.50,
    categoria: 'Acero',
    unidad: 'pieza',
    unidadAlterna: 'kg',
    stock: 1500,
    imagen: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=150&fit=crop',
    permiteDecimales: true,
    pesoUnitario: 8.5
  },
  {
    id: 2,
    codigo: 'CM-001',
    nombre: 'Cemento Cruz Azul 50kg',
    descripcion: 'Cemento Portland Compuesto CPC 30R',
    precio: 285.00,
    precioPorKg: 5.70,
    categoria: 'Cemento',
    unidad: 'bulto',
    unidadAlterna: 'kg',
    stock: 250,
    imagen: 'https://images.unsplash.com/photo-1568038479111-87bf80659645?w=150&h=150&fit=crop',
    permiteDecimales: true
  },
  {
    id: 3,
    codigo: 'LA-001',
    nombre: 'Ladrillo Rojo Recocido',
    descripcion: 'Ladrillo 7x14x28 cm, resistencia 150 kg/cm²',
    precio: 12.75,
    precioPorMil: 12750,
    categoria: 'Ladrillo',
    unidad: 'pieza',
    unidadAlterna: 'millar',
    stock: 25000,
    imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop',
    permiteDecimales: false
  },
  {
    id: 4,
    codigo: 'AR-001',
    nombre: 'Arena Sílica M3',
    descripcion: 'Arena lavada, granulometría controlada',
    precio: 850.00,
    precioPorM3: 850,
    categoria: 'Arena',
    unidad: 'm3',
    stock: 45,
    imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&h=150&fit=crop',
    permiteDecimales: true
  },
  {
    id: 5,
    codigo: 'TU-001',
    nombre: 'Tubo PVC 3" x 6m',
    descripcion: 'Tubo sanitario Schedule 40, presión 120 PSI',
    precio: 420.00,
    categoria: 'Tubería',
    unidad: 'pieza',
    stock: 180,
    imagen: 'https://images.unsplash.com/photo-1622146191320-4b0f5708796e?w=150&h=150&fit=crop',
    permiteDecimales: false
  },
  {
    id: 6,
    codigo: 'PI-001',
    nombre: 'Pintura Vinimex 19L',
    descripcion: 'Pintura vinílica mate, rendimiento 12 m²/L',
    precio: 1250.00,
    categoria: 'Pintura',
    unidad: 'bote',
    stock: 35,
    imagen: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&h=150&fit=crop',
    permiteDecimales: false
  },
  {
    id: 7,
    codigo: 'CA-001',
    nombre: 'Cable THW Cal 12',
    descripcion: 'Cable de cobre, aislamiento termoplástico',
    precio: 42.50,
    precioPorRollo: 4250,
    categoria: 'Eléctrico',
    unidad: 'metro',
    unidadAlterna: 'rollo',
    stock: 5000,
    imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
    permiteDecimales: true
  },
  {
    id: 8,
    codigo: 'CL-001',
    nombre: 'Clavo 2 1/2" Galvanizado',
    descripcion: 'Clavo estructural zincado, caja 25kg',
    precio: 35.00,
    categoria: 'Fijaciones',
    unidad: 'kg',
    stock: 850,
    imagen: 'https://images.unsplash.com/photo-1598981454602-e6a7e5d37080?w=150&h=150&fit=crop',
    permiteDecimales: true
  }
];

// Ventas en espera
const ventasEnEspera = [
  {
    id: 'ESPERA-001',
    cliente: 'Constructora Progreso',
    fecha: '2024-01-15 10:30',
    items: 3,
    total: 2580.50,
    vendedor: 'Juan Pérez',
    carrito: []
  },
  {
    id: 'ESPERA-002',
    cliente: 'Arquitectura & Diseño',
    fecha: '2024-01-15 11:15',
    items: 2,
    total: 1850.00,
    vendedor: 'María González',
    carrito: []
  }
];

// Cotizaciones pendientes
const cotizacionesPendientes = [
  {
    id: 'COT-001',
    cliente: 'Ingeniería Civil SA',
    fecha: '2024-01-14',
    items: 5,
    total: 12500.00,
    validez: '7 días'
  },
  {
    id: 'COT-002',
    cliente: 'Techos Modernos',
    fecha: '2024-01-13',
    items: 3,
    total: 8500.00,
    validez: '15 días'
  }
];

const POSInframex = () => {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cliente, setCliente] = useState(null);
  const [facturacion, setFacturacion] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidadInput, setCantidadInput] = useState('1');
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('principal');
  const [ventasGuardadas, setVentasGuardadas] = useState(ventasEnEspera);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Cálculos
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  const comision = total * 0.05;

  // Funciones principales
  const agregarAlCarrito = (producto, cantidad = 1, unidad = 'principal') => {
    const precio = unidad === 'alterna' && producto.precioPorKg ? producto.precioPorKg : producto.precio;
    
    const existe = carrito.find(item => 
      item.id === producto.id && item.unidad === unidad
    );

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map(item =>
        item.id === producto.id && item.unidad === unidad
          ? { ...item, cantidad: parseFloat(item.cantidad) + parseFloat(cantidad) }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { 
        ...producto, 
        cantidad: parseFloat(cantidad),
        precio,
        unidad,
        precioOriginal: producto.precio
      }];
    }

    setCarrito(nuevoCarrito);
    mostrarSnackbar(`${cantidad} ${unidad === 'alterna' ? producto.unidadAlterna : producto.unidad} de "${producto.nombre}" agregados`, 'success');
    setOpenDialog(false);
  };

  const modificarCantidad = (id, cambio, unidad) => {
    setCarrito(carrito.map(item =>
      item.id === id && item.unidad === unidad
        ? { ...item, cantidad: Math.max(0.1, parseFloat(item.cantidad) + cambio) }
        : item
    ));
  };

  const guardarVenta = () => {
    const nuevaVenta = {
      id: `ESPERA-${ventasGuardadas.length + 1}`,
      cliente: cliente?.nombre || 'Cliente Express',
      fecha: new Date().toLocaleString('es-MX'),
      items: carrito.length,
      total: total,
      vendedor: 'Joel Durán',
      carrito: [...carrito]
    };

    setVentasGuardadas([nuevaVenta, ...ventasGuardadas]);
    setCarrito([]);
    setCliente(null);
    mostrarSnackbar('Venta guardada en espera correctamente', 'info');
  };

  const recuperarVenta = (venta) => {
    setCarrito(venta.carrito || []);
    setCliente({ nombre: venta.cliente });
    mostrarSnackbar('Venta recuperada del historial', 'success');
    setOpenDrawer(false);
  };

  const convertirCotizacion = (cotizacion) => {
    // Aquí se cargarían los items de la cotización
    mostrarSnackbar('Cotización convertida a venta', 'success');
    setOpenDrawer(false);
  };

  const finalizarVenta = () => {
    const ventaData = {
      carrito,
      cliente,
      facturacion,
      metodoPago,
      total,
      fecha: new Date().toISOString()
    };

    console.log('Venta procesada:', ventaData);
    
    // Resetear todo
    setCarrito([]);
    setCliente(null);
    setFacturacion(false);
    setMetodoPago('');
    
    mostrarSnackbar(`Venta finalizada por $${total.toFixed(2)}`, 'success');
  };

  const mostrarSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Componentes UI
  const ProductoRow = ({ producto }) => (
    <TableRow 
      hover 
      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f8fafc' } }}
      onClick={() => {
        setSelectedProduct(producto);
        setCantidadInput('1');
        setUnidadSeleccionada('principal');
        setOpenDialog(true);
      }}
    >
      <TableCell sx={{ width: 80 }}>
        <Avatar
          variant="rounded"
          src={producto.imagen}
          sx={{ width: 60, height: 60, border: '1px solid #e5e7eb' }}
        >
          <Inventory />
        </Avatar>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#111827' }}>
            {producto.nombre}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
            {producto.descripcion}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <Chip label={producto.codigo} size="small" variant="outlined" />
            <Chip 
              label={producto.categoria} 
              size="small" 
              sx={{ bgcolor: alpha('#3b82f6', 0.1), color: '#3b82f6' }}
            />
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#111827' }}>
            ${producto.precio.toFixed(2)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            por {producto.unidad}
          </Typography>
          {producto.precioPorKg && (
            <Typography variant="caption" sx={{ color: '#10b981', display: 'block', mt: 0.5 }}>
              ${producto.precioPorKg.toFixed(2)} / {producto.unidadAlterna}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {producto.permiteDecimales ? (
            <Chip 
              icon={<Scale />} 
              label="Peso variable" 
              size="small"
              sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981' }}
            />
          ) : (
            <Chip 
              label="Unidades" 
              size="small"
              sx={{ bgcolor: alpha('#3b82f6', 0.1), color: '#3b82f6' }}
            />
          )}
          <Chip 
            label={`Stock: ${producto.stock}`}
            size="small"
            variant="outlined"
            color={producto.stock > 100 ? "success" : "warning"}
          />
        </Box>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={(e) => {
            e.stopPropagation();
            agregarAlCarrito(producto, 1, 'principal');
          }}
        >
          Agregar
        </Button>
      </TableCell>
    </TableRow>
  );

  const ItemCarritoRow = ({ item }) => (
    <TableRow>
      <TableCell sx={{ width: 60 }}>
        <Avatar
          variant="rounded"
          src={item.imagen}
          sx={{ width: 50, height: 50 }}
        >
          <Inventory />
        </Avatar>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" fontWeight={600}>{item.nombre}</Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            {item.unidad === 'alterna' ? item.unidadAlterna : item.unidad}
            {item.unidad === 'alterna' && ` (${item.precioPorKg ? 'por kg' : 'por rollo'})`}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => modificarCantidad(item.id, -1, item.unidad)}
          >
            <Remove />
          </IconButton>
          <TextField
            size="small"
            value={item.cantidad}
            onChange={(e) => {
              const valor = e.target.value;
              if (item.permiteDecimales || /^\d+$/.test(valor) || valor === '') {
                setCarrito(carrito.map(i =>
                  i.id === item.id && i.unidad === item.unidad
                    ? { ...i, cantidad: parseFloat(valor) || 0 }
                    : i
                ));
              }
            }}
            sx={{ width: 80 }}
            inputProps={{ 
              style: { textAlign: 'center' },
              type: item.permiteDecimales ? 'number' : 'text'
            }}
          />
          <IconButton 
            size="small" 
            onClick={() => modificarCantidad(item.id, 1, item.unidad)}
          >
            <Add />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={600}>
          ${item.precio.toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={600}>
          ${(item.precio * item.cantidad).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          color="error"
          onClick={() => setCarrito(carrito.filter(i => 
            !(i.id === item.id && i.unidad === item.unidad)
          ))}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
      <Sidebar />
      
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper sx={{ 
          p: 2, 
          borderRadius: 0, 
          borderBottom: '1px solid #e5e7eb',
          bgcolor: 'white',
          boxShadow: 'sm'
        }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#2563eb', width: 48, height: 48 }}>
                  <LocalShipping sx={{ fontSize: 24 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#111827' }}>
                    PUNTO DE VENTA INFAMEX
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Sistema de venta rápida para materiales de construcción
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                <Tooltip title="Ventas en espera">
                  <Badge badgeContent={ventasGuardadas.length} color="primary">
                    <Button
                      variant="outlined"
                      startIcon={<PendingActions />}
                      onClick={() => setOpenDrawer(true)}
                    >
                      En Espera
                    </Button>
                  </Badge>
                </Tooltip>
                
                <Tooltip title="Historial cotizaciones">
                  <Badge badgeContent={cotizacionesPendientes.length} color="secondary">
                    <Button
                      variant="outlined"
                      startIcon={<History />}
                      onClick={() => {
                        setOpenDrawer(true);
                        setTabValue(1);
                      }}
                    >
                      Cotizaciones
                    </Button>
                  </Badge>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Contenido principal */}
        <Box sx={{ flex: 1, display: 'flex', p: 3, gap: 3, overflow: 'hidden' }}>
          {/* Panel izquierdo - Productos */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Barra de búsqueda */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: 'white' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  inputRef={searchRef}
                  placeholder="Buscar por código, nombre o categoría..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <Tooltip title="Escanear código de barras">
                  <IconButton sx={{ bgcolor: '#f3f4f6', borderRadius: 2 }}>
                    <QrCodeScanner />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Buscar cliente">
                  <IconButton sx={{ bgcolor: '#f3f4f6', borderRadius: 2 }}>
                    <Person />
                  </IconButton>
                </Tooltip>
              </Box>
              
              {busqueda && (
                <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, display: 'block' }}>
                  {materialesInframex.filter(p => 
                    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                    p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
                  ).length} productos encontrados
                </Typography>
              )}
            </Paper>

            {/* Tabla de productos */}
            <Paper sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', bgcolor: 'white' }}>
              <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell width="80">Imagen</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell width="120">Precio</TableCell>
                      <TableCell width="150">Unidad / Stock</TableCell>
                      <TableCell width="120" align="right">Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {materialesInframex
                      .filter(producto =>
                        busqueda === '' ||
                        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                        producto.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                        producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
                      )
                      .map((producto) => (
                        <ProductoRow key={producto.id} producto={producto} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* Panel derecho - Carrito y resumen */}
          <Box sx={{ width: 500, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Información del cliente */}
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#111827' }}>
                  <Person sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
                  Cliente
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={facturacion}
                      onChange={(e) => setFacturacion(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Facturar"
                />
              </Box>
              
              {cliente ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{cliente.nombre}</Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {facturacion ? 'Con factura' : 'Sin factura'}
                    </Typography>
                  </Box>
                  <Button size="small" onClick={() => setCliente(null)}>
                    Cambiar
                  </Button>
                </Box>
              ) : (
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Person />}
                  onClick={() => setCliente({ nombre: 'Cliente Express' })}
                >
                  Seleccionar cliente
                </Button>
              )}
              
              {facturacion && cliente && (
                <Alert severity="info" sx={{ mt: 2, fontSize: '0.8rem' }}>
                  Se generará factura electrónica con los datos del cliente
                </Alert>
              )}
            </Paper>

            {/* Carrito */}
            <Paper sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb', bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#111827' }}>
                    <ShoppingCart sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
                    Carrito de Venta
                  </Typography>
                  <Badge badgeContent={carrito.length} color="primary">
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {carrito.reduce((sum, item) => sum + item.cantidad, 0)} unidades
                    </Typography>
                  </Badge>
                </Box>
              </Box>
              
              {carrito.length === 0 ? (
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#9ca3af',
                  p: 4
                }}>
                  <ShoppingCart sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>Carrito vacío</Typography>
                  <Typography variant="caption" align="center">
                    Busca y selecciona materiales<br />para agregar al carrito
                  </Typography>
                </Box>
              ) : (
                <TableContainer sx={{ flex: 1 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell width="60"></TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carrito.map((item, index) => (
                        <ItemCarritoRow key={`${item.id}-${item.unidad}-${index}`} item={item} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

            {/* Resumen y acciones */}
            <Paper sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
              {/* Totales */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>Subtotal:</Typography>
                  <Typography variant="body2" fontWeight={600}>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>IVA (16%):</Typography>
                  <Typography variant="body2" fontWeight={600}>${iva.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h5" color="primary" fontWeight={700}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((total / 10000) * 100, 100)} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    mb: 1,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: total > 5000 ? '#f59e0b' : '#10b981',
                      borderRadius: 3
                    }
                  }} 
                />
                <Typography variant="caption" sx={{ color: '#6b7280', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Comisión: <strong>${comision.toFixed(2)}</strong></span>
                  <span>{total > 5000 ? '¡Venta grande!' : 'Meta: $10,000'}</span>
                </Typography>
              </Box>

              {/* Métodos de pago */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#111827', fontWeight: 600 }}>
                  Método de Pago
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant={metodoPago === 'efectivo' ? 'contained' : 'outlined'}
                      startIcon={<Money />}
                      onClick={() => setMetodoPago('efectivo')}
                      sx={{ py: 1.5 }}
                    >
                      Efectivo
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant={metodoPago === 'tarjeta' ? 'contained' : 'outlined'}
                      startIcon={<CreditCard />}
                      onClick={() => setMetodoPago('tarjeta')}
                      sx={{ py: 1.5 }}
                    >
                      Tarjeta
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {/* Botones de acción */}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Save />}
                    onClick={guardarVenta}
                    disabled={carrito.length === 0}
                    sx={{ py: 1.5 }}
                  >
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Receipt />}
                    onClick={finalizarVenta}
                    disabled={carrito.length === 0 || !metodoPago}
                    sx={{ py: 1.5 }}
                  >
                    Finalizar Venta
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Drawer para ventas en espera y cotizaciones */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ sx: { width: 400 } }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              <History sx={{ mr: 1, verticalAlign: 'middle' }} />
              Historial
            </Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ mt: 2 }}
          >
            <Tab label="Ventas en espera" icon={<PendingActions />} iconPosition="start" />
            <Tab label="Cotizaciones" icon={<PictureAsPdf />} iconPosition="start" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
          {tabValue === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {ventasGuardadas.map((venta) => (
                <Paper key={venta.id} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{venta.id}</Typography>
                    <Chip label={venta.items} size="small" />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>{venta.cliente}</Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 1 }}>
                    {venta.fecha} • {venta.vendedor}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">${venta.total.toFixed(2)}</Typography>
                    <Button
                      size="small"
                      startIcon={<Restore />}
                      onClick={() => recuperarVenta(venta)}
                    >
                      Recuperar
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cotizacionesPendientes.map((cot) => (
                <Paper key={cot.id} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{cot.id}</Typography>
                    <Chip label={cot.validez} size="small" color="secondary" />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>{cot.cliente}</Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 1 }}>
                    {cot.fecha} • {cot.items} items
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">${cot.total.toFixed(2)}</Typography>
                    <Button
                      size="small"
                      startIcon={<AttachMoney />}
                      onClick={() => convertirCotizacion(cot)}
                    >
                      Convertir a Venta
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Dialog para agregar producto con cantidad */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Agregar al carrito</Typography>
                <IconButton onClick={() => setOpenDialog(false)} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Avatar
                  variant="rounded"
                  src={selectedProduct.imagen}
                  sx={{ width: 100, height: 100 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>{selectedProduct.nombre}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    {selectedProduct.descripcion}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={selectedProduct.codigo} size="small" />
                    <Chip label={selectedProduct.categoria} size="small" color="primary" />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Seleccionar unidad:</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant={unidadSeleccionada === 'principal' ? 'contained' : 'outlined'}
                      onClick={() => setUnidadSeleccionada('principal')}
                    >
                      {selectedProduct.unidad} (${selectedProduct.precio.toFixed(2)})
                    </Button>
                    {selectedProduct.unidadAlterna && (
                      <Button
                        variant={unidadSeleccionada === 'alterna' ? 'contained' : 'outlined'}
                        onClick={() => setUnidadSeleccionada('alterna')}
                      >
                        {selectedProduct.unidadAlterna} 
                        (${selectedProduct.precioPorKg ? selectedProduct.precioPorKg.toFixed(2) : selectedProduct.precioPorMil?.toFixed(2)})
                      </Button>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Cantidad {selectedProduct.permiteDecimales ? '(decimales permitidos)' : '(solo enteros)'}:
                  </Typography>
                  <TextField
                    fullWidth
                    value={cantidadInput}
                    onChange={(e) => {
                      const valor = e.target.value;
                      if (selectedProduct.permiteDecimales || /^\d*$/.test(valor)) {
                        setCantidadInput(valor);
                      }
                    }}
                    type={selectedProduct.permiteDecimales ? "number" : "text"}
                    inputProps={{ step: "0.1" }}
                    placeholder={selectedProduct.permiteDecimales ? "Ej: 2.5" : "Ej: 2"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {[1, 2.5, 5, 10].map((num) => (
                      <Chip
                        key={num}
                        label={num}
                        onClick={() => setCantidadInput(num.toString())}
                        variant={cantidadInput === num.toString() ? "filled" : "outlined"}
                        color="primary"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button
                variant="contained"
                onClick={() => agregarAlCarrito(selectedProduct, parseFloat(cantidadInput) || 1, unidadSeleccionada)}
                disabled={!cantidadInput || parseFloat(cantidadInput) <= 0}
              >
                Agregar {cantidadInput} {unidadSeleccionada === 'alterna' ? selectedProduct.unidadAlterna : selectedProduct.unidad}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default POSInframex;