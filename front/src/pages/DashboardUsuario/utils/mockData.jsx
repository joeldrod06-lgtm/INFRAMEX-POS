import {
  People,
  LocalShipping,
  Assessment,
  AttachMoney,
  TrendingUp,
  CreditCard,
  ShowChart,
  ShoppingCart,
  Inventory,
  Receipt,
} from '@mui/icons-material';

// Colores formales para dashboard profesional
const COLORS = {
  primary: '#1e40af',
  secondary: '#374151',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  info: '#0ea5e9',
};

export const usuarioInfo = {
  nombre: 'Joel Duran',
  rol: 'Gerente de Ventas',
  sucursal: 'Centro Comercial',
  metaVentas: 85,
  pedidosPendientes: 5,
  clientesActivos: 24,
  comisionMensual: '$4,250',
  porcentajeComision: 2.5
};

export const tareasUsuario = [
  { id: 1, descripcion: 'Revisión de inventario semanal', fecha: 'Hoy, 15:00', completada: false, prioridad: 'alta' },
  { id: 2, descripcion: 'Reporte financiero mensual', fecha: 'Mañana, 10:00', completada: false, prioridad: 'media' },
  { id: 3, descripcion: 'Capacitación nuevo personal', fecha: 'Viernes, 14:00', completada: true, prioridad: 'media' },
  { id: 4, descripcion: 'Auditoría de caja', fecha: '01/03, 09:00', completada: false, prioridad: 'alta' },
  { id: 5, descripcion: 'Actualización de precios', fecha: 'Esta semana', completada: false, prioridad: 'baja' },
];

export const ventasCredito = [
  { id: '#VC-001', cliente: 'Corporación XYZ S.A.', monto: '$12,500', fecha: '15/02/2024', plazo: '30 días', estado: 'Pendiente' },
  { id: '#VC-002', cliente: 'Comercial Internacional', monto: '$8,700', fecha: '10/02/2024', plazo: '45 días', estado: 'Pendiente' },
  { id: '#VC-003', cliente: 'Tecnología Avanzada', monto: '$5,200', fecha: '05/02/2024', plazo: '60 días', estado: 'Pagado' },
  { id: '#VC-004', cliente: 'Distribuidora Nacional', monto: '$3,800', fecha: '28/01/2024', plazo: '30 días', estado: 'Pagado' },
];

export const resumenComisiones = {
  ventasTotalesMes: '$185,400',
  ventasCreditoMes: '$30,200',
  porcentajeComision: '2.5%',
  comisionCalculada: '$4,635',
  comisionPagada: '$2,850',
  comisionPendiente: '$1,785'
};

export const estadisticasRapidas = [
  { 
    value: '24', 
    label: 'Clientes Activos', 
    icon: <People />,
    color: COLORS.primary,
    bgColor: '#dbeafe',
    trend: { value: '+12%', direction: 'up' }
  },
  { 
    value: '5', 
    label: 'Pedidos Pendientes', 
    icon: <LocalShipping />,
    color: COLORS.warning,
    bgColor: '#fef3c7',
    trend: { value: '-3%', direction: 'down' }
  },
  { 
    value: '$185.4K', 
    label: 'Ventas Mensuales', 
    icon: <Assessment />,
    color: COLORS.success,
    bgColor: '#d1fae5',
    trend: { value: '+8.5%', direction: 'up' }
  },
  { 
    value: '85%', 
    label: 'Meta de Ventas', 
    icon: <TrendingUp />,
    color: COLORS.info,
    bgColor: '#e0f2fe',
    trend: { value: '+5.2%', direction: 'up' }
  }
];

export const kpis = [
  {
    title: 'Ticket Promedio',
    value: '$245.80',
    icon: <Receipt />,
    color: COLORS.primary,
    progress: 78,
    subtitle: 'Aumentó 12% este mes'
  },
  {
    title: 'Conversión',
    value: '42.5%',
    icon: <TrendingUp />,
    color: COLORS.success,
    progress: 42,
    subtitle: 'Tasa de visitas a ventas'
  },
  {
    title: 'Rotación',
    value: '3.8x',
    icon: <Inventory />,
    color: COLORS.info,
    subtitle: 'Inventario mensual'
  },
  {
    title: 'Margen Neto',
    value: '28.3%',
    icon: <AttachMoney />,
    color: COLORS.warning,
    progress: 28,
    subtitle: 'Beneficio operativo'
  }
];