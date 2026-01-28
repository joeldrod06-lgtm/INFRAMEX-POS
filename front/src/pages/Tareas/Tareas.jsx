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
  Checkbox,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  CheckCircle,
  Assignment,
  Person,
  Today,
  MoreVert,
  Add,
  Edit,
  Delete,
  TaskAlt,
  PendingActions,
  AssignmentLate,
  TrendingUp,
  AccessTime,
  PriorityHigh,
  Schedule,
  LowPriority,
  ViewList,
  ViewModule,
  FilterAlt,
  Sort,
  ArrowForward,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos de tareas del vendedor actual
const tareasVendedor = [
  {
    id: 1,
    titulo: 'Seguimiento cliente Corporativo S.A.',
    descripcion: 'Contactar para seguimiento de cotización enviada',
    cliente: 'Corporativo S.A.',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaVencimiento: '2024-12-15',
    completada: false,
    progreso: 0,
    etiquetas: ['cotización', 'seguimiento'],
    tiempoEstimado: 30,
  },
  {
    id: 2,
    titulo: 'Visita técnica obra Av. Principal',
    descripcion: 'Evaluar necesidades de materiales en obra',
    cliente: 'Constructora Progreso',
    prioridad: 'media',
    estado: 'en_progreso',
    fechaVencimiento: '2024-12-12',
    completada: false,
    progreso: 60,
    etiquetas: ['visita', 'técnica'],
    tiempoEstimado: 120,
  },
  {
    id: 3,
    titulo: 'Enviar cotización remodelación',
    descripcion: 'Preparar y enviar cotización detallada',
    cliente: 'Familia Rodríguez',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaVencimiento: '2024-12-11',
    completada: false,
    progreso: 30,
    etiquetas: ['urgente', 'cotización'],
    tiempoEstimado: 45,
  },
  {
    id: 4,
    titulo: 'Capacitación productos nuevos',
    descripcion: 'Asistir a sesión de capacitación',
    cliente: 'Interno',
    prioridad: 'baja',
    estado: 'completada',
    fechaVencimiento: '2024-12-10',
    completada: true,
    progreso: 100,
    etiquetas: ['capacitación'],
    tiempoEstimado: 90,
  },
  {
    id: 5,
    titulo: 'Reunión con proveedor',
    descripcion: 'Revisar condiciones comerciales',
    cliente: 'Cementos Nacionales',
    prioridad: 'media',
    estado: 'en_progreso',
    fechaVencimiento: '2024-12-14',
    completada: false,
    progreso: 80,
    etiquetas: ['reunión', 'proveedor'],
    tiempoEstimado: 60,
  },
];

const TareaCard = ({ tarea, onToggleComplete }) => {
  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626', icon: <PriorityHigh sx={{ fontSize: 14 }} /> };
      case 'media': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706', icon: <Schedule sx={{ fontSize: 14 }} /> };
      case 'baja': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669', icon: <LowPriority sx={{ fontSize: 14 }} /> };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280', icon: <LowPriority sx={{ fontSize: 14 }} /> };
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'completada': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' };
      case 'en_progreso': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' };
      case 'pendiente': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280' };
    }
  };

  const prioridad = getPrioridadColor(tarea.prioridad);
  const estado = getEstadoColor(tarea.estado);

  const calcularDiasRestantes = (fecha) => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diffTime = vencimiento - hoy;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const diasRestantes = calcularDiasRestantes(tarea.fechaVencimiento);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          borderColor: '#3b82f6',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header con checkbox y prioridad */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Checkbox
              checked={tarea.completada}
              onChange={() => onToggleComplete(tarea.id)}
              size="small"
              sx={{ p: 0.5 }}
            />
            <Chip
              label={tarea.prioridad}
              size="small"
              icon={prioridad.icon}
              sx={{
                backgroundColor: prioridad.bg,
                color: prioridad.text,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: '24px',
              }}
            />
          </Stack>
          
          <Chip
            label={tarea.estado.replace('_', ' ')}
            size="small"
            sx={{
              backgroundColor: estado.bg,
              color: estado.text,
              fontSize: '0.7rem',
              height: '24px',
            }}
          />
        </Stack>

        {/* Título y descripción */}
        <Typography
          variant="subtitle2"
          fontWeight={600}
          gutterBottom
          sx={{
            color: tarea.completada ? '#9ca3af' : '#111827',
            textDecoration: tarea.completada ? 'line-through' : 'none',
            mb: 1,
          }}
        >
          {tarea.titulo}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.875rem',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tarea.descripcion}
        </Typography>

        {/* Información rápida */}
        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Person sx={{ fontSize: 14, color: '#6b7280' }} />
              <Typography variant="caption" color="text.secondary">
                {tarea.cliente}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end">
              <Today sx={{ fontSize: 14, color: '#6b7280' }} />
              <Chip
                label={`${diasRestantes}d`}
                size="small"
                sx={{
                  backgroundColor: diasRestantes <= 1 ? 'rgba(239, 68, 68, 0.1)' : 
                                  diasRestantes <= 3 ? 'rgba(245, 158, 11, 0.1)' : 
                                  'rgba(16, 185, 129, 0.1)',
                  color: diasRestantes <= 1 ? '#dc2626' : 
                         diasRestantes <= 3 ? '#d97706' : '#059669',
                  fontSize: '0.7rem',
                  height: '20px',
                }}
              />
            </Stack>
          </Grid>
        </Grid>

        {/* Progreso */}
        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={tarea.progreso}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                backgroundColor: tarea.progreso === 100 ? '#10b981' : '#3b82f6',
              }
            }}
          />
        </Box>

        {/* Footer con etiquetas */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {tarea.etiquetas.map((etiqueta, index) => (
            <Chip
              key={index}
              label={etiqueta}
              size="small"
              sx={{
                fontSize: '0.65rem',
                height: '20px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const ResumenTareas = ({ tareas }) => {
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = tareas.filter(t => !t.completada && t.estado === 'pendiente').length;
  const enProgreso = tareas.filter(t => t.estado === 'en_progreso').length;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <TaskAlt sx={{ color: '#059669' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Completadas
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#059669">
                {completadas}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <PendingActions sx={{ color: '#d97706' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                Pendientes
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#d97706">
                {pendientes}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
              <TrendingUp sx={{ color: '#3b82f6' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="#64748b">
                En Progreso
              </Typography>
              <Typography variant="h5" fontWeight={700} color="#3b82f6">
                {enProgreso}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function ModuloTareasVendedor() {
  const [tareas, setTareas] = useState(tareasVendedor);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [vista, setVista] = useState('grid');

  const handleToggleComplete = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id 
        ? { 
            ...tarea, 
            completada: !tarea.completada,
            estado: tarea.completada ? 'pendiente' : 'completada',
            progreso: tarea.completada ? 0 : 100
          }
        : tarea
    ));
  };

  const tareasFiltradas = tareas.filter(tarea => {
    // Filtro por estado
    if (filtro !== 'todos') {
      if (filtro === 'completadas' && !tarea.completada) return false;
      if (filtro === 'pendientes' && tarea.completada) return false;
      if (filtro === 'progreso' && tarea.estado !== 'en_progreso') return false;
    }
    
    // Búsqueda
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        tarea.titulo.toLowerCase().includes(searchLower) ||
        tarea.descripcion.toLowerCase().includes(searchLower) ||
        tarea.cliente.toLowerCase().includes(searchLower)
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
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#1e293b" gutterBottom>
                <Assignment sx={{ mr: 1.5, verticalAlign: 'middle', color: '#4f46e5' }} />
                Mis Tareas
              </Typography>
              <Typography variant="body2" color="#64748b">
                Gestiona y da seguimiento a tus actividades
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Tooltip title={vista === 'grid' ? 'Vista lista' : 'Vista grid'}>
                <IconButton 
                  onClick={() => setVista(vista === 'grid' ? 'lista' : 'grid')}
                  sx={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}
                >
                  {vista === 'grid' ? <ViewList /> : <ViewModule />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Resumen */}
          <ResumenTareas tareas={tareas} />
        </Box>

        {/* Barra de búsqueda y filtros */}
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
              fullWidth
              placeholder="Buscar tareas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label="TODAS"
                clickable
                variant={filtro === 'todos' ? 'filled' : 'outlined'}
                color="primary"
                onClick={() => setFiltro('todos')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
              <Chip
                label="PENDIENTES"
                clickable
                variant={filtro === 'pendientes' ? 'filled' : 'outlined'}
                color="warning"
                onClick={() => setFiltro('pendientes')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
              <Chip
                label="EN PROGRESO"
                clickable
                variant={filtro === 'progreso' ? 'filled' : 'outlined'}
                color="info"
                onClick={() => setFiltro('progreso')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
              <Chip
                label="COMPLETADAS"
                clickable
                variant={filtro === 'completadas' ? 'filled' : 'outlined'}
                color="success"
                onClick={() => setFiltro('completadas')}
                sx={{ fontWeight: 500, borderRadius: '20px' }}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Grid de tareas */}
        {tareasFiltradas.length > 0 ? (
          <>
            <Typography variant="subtitle2" color="#64748b" sx={{ mb: 2 }}>
              Mostrando {tareasFiltradas.length} tareas
              {filtro !== 'todos' && ` (${filtro})`}
            </Typography>
            
            <Grid container spacing={2}>
              {tareasFiltradas.map((tarea) => (
                <Grid item xs={12} sm={vista === 'grid' ? 6 : 12} md={vista === 'grid' ? 4 : 12} key={tarea.id}>
                  <TareaCard 
                    tarea={tarea} 
                    onToggleComplete={handleToggleComplete}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Assignment sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
            <Typography variant="h6" color="#475569" gutterBottom>
              No hay tareas
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              {busqueda ? 'No se encontraron tareas con esa búsqueda' : 'No tienes tareas asignadas'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}