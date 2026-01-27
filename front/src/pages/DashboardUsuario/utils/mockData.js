import {
  TrendingUp,
  AttachMoney,
  CreditCard,
  ShowChart,
} from '@mui/icons-material';
import { colorPalette } from './colors';

export const usuarioInfo = {
  nombre: 'Joel Duran',
  rol: 'Vendedor',
  sucursal: 'Sucursal Centro',
  metaVentas: 85,
  pedidosPendientes: 5,
  clientesActivos: 24,
  comisionMensual: '$4,250',
  porcentajeComision: 2.5
};

export const tareasUsuario = [
  { id: 1, descripcion: 'Seguimiento a cliente ElectroCom', fecha: 'Hoy, 15:00', completada: false, prioridad: 'alta' },
  { id: 2, descripcion: 'Actualizar inventario sección cables', fecha: 'Mañana', completada: false, prioridad: 'media' },
  { id: 3, descripcion: 'Reporte de ventas semanal', fecha: 'Viernes', completada: true, prioridad: 'media' },
  { id: 4, descripcion: 'Reunión de equipo comercial', fecha: '01/03, 10:00', completada: false, prioridad: 'alta' },
  { id: 5, descripcion: 'Contactar nuevos prospectos', fecha: 'Esta semana', completada: false, prioridad: 'baja' },
];

export const ventasCredito = [
  { id: '#VC-001', cliente: 'ElectroCom S.A.', monto: '$12,500', fecha: '15/02/2024', plazo: '30 días', estado: 'Pendiente' },
  { id: '#VC-002', cliente: 'Comercial MX', monto: '$8,700', fecha: '10/02/2024', plazo: '45 días', estado: 'Pendiente' },
  { id: '#VC-003', cliente: 'TecnoSoluciones', monto: '$5,200', fecha: '05/02/2024', plazo: '60 días', estado: 'Pagado' },
  { id: '#VC-004', cliente: 'Distribuidora Norte', monto: '$3,800', fecha: '28/01/2024', plazo: '30 días', estado: 'Pagado' },
];

export const resumenComisiones = {
  ventasTotalesMes: '$185,400',
  ventasCreditoMes: '$30,200',
  porcentajeComision: '2.5%',
  comisionCalculada: '$4,635',
  comisionPagada: '$2,850',
  comisionPendiente: '$1,785'
};

export const kpis = [
  {
    title: 'Progreso de Meta',
    value: `${usuarioInfo.metaVentas}%`,
    icon: <TrendingUp />,
    color: colorPalette.primary,
    bgColor: colorPalette.primaryLightest,
    progress: usuarioInfo.metaVentas,
    subtitle: `Ventas: ${resumenComisiones.ventasTotalesMes}`
  },
  {
    title: 'Comisión Acumulada',
    value: resumenComisiones.comisionCalculada,
    icon: <AttachMoney />,
    color: colorPalette.primary,
    bgColor: colorPalette.primaryLightest,
    subtitle: `${resumenComisiones.porcentajeComision} sobre ventas`,
    trend: '+12.5%'
  },
  {
    title: 'Ventas a Crédito',
    value: resumenComisiones.ventasCreditoMes,
    icon: <CreditCard />,
    color: colorPalette.primary,
    bgColor: colorPalette.primaryLightest,
    subtitle: `${ventasCredito.filter(v => v.estado === 'Pendiente').length} pendientes`
  },
  {
    title: 'Eficiencia',
    value: '92%',
    icon: <ShowChart />,
    color: colorPalette.primary,
    bgColor: colorPalette.primaryLightest,
    subtitle: 'Tasa de conversión',
    progress: 92
  }
];