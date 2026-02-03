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
  Stack,
  IconButton,
  Checkbox,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  FilterList,
  CheckCircle,
  Assignment,
  Person,
  Today,
} from '@mui/icons-material';
import Sidebar from '../../shared/components/SideBar';

// Datos de tareas del vendedor actual
const tareasVendedor = [
  {
    id: 1,
    titulo: 'Seguimiento cliente Corporativo S.A.',
    cliente: 'Corporativo S.A.',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaVencimiento: '2024-12-15',
    completada: false,
  },
  {
    id: 2,
    titulo: 'Visita técnica obra Av. Principal',
    cliente: 'Constructora Progreso',
    prioridad: 'media',
    estado: 'en_progreso',
    fechaVencimiento: '2024-12-12',
    completada: false,
  },
  {
    id: 3,
    titulo: 'Enviar cotización remodelación',
    cliente: 'Familia Rodríguez',
    prioridad: 'alta',
    estado: 'pendiente',
    fechaVencimiento: '2024-12-11',
    completada: false,
  },
  {
    id: 4,
    titulo: 'Capacitación productos nuevos',
    cliente: 'Interno',
    prioridad: 'baja',
    estado: 'completada',
    fechaVencimiento: '2024-12-10',
    completada: true,
  },
  {
    id: 5,
    titulo: 'Reunión con proveedor',
    cliente: 'Cementos Nacionales',
    prioridad: 'media',
    estado: 'en_progreso',
    fechaVencimiento: '2024-12-14',
    completada: false,
  },
];

const TareaCard = ({ tarea, onToggleComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

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
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        height: '100%',
        '&:hover': {
          borderColor: '#3b82f6',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <Checkbox
              checked={tarea.completada}
              onChange={() => onToggleComplete(tarea.id)}
              size="small"
              sx={{ p: 0 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                sx={{
                  color: tarea.completada ? '#94a3b8' : '#0f172a',
                  textDecoration: tarea.completada ? 'line-through' : 'none',
                  mb: 0.5,
                }}
              >
                {tarea.titulo}
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Person sx={{ fontSize: 14, color: '#64748b' }} />
                  <Typography variant="caption" color="#64748b">
                    {isMobile ? tarea.cliente.substring(0, 15) + '...' : tarea.cliente}
                  </Typography>
                </Stack>
                
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: getPrioridadColor(tarea.prioridad),
                  }}
                />
              </Stack>
            </Box>
          </Stack>

          {/* Footer */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip
              label={tarea.estado.replace('_', ' ')}
              size="small"
              sx={{
                backgroundColor: tarea.estado === 'completada' ? '#dcfce7' : 
                                 tarea.estado === 'en_progreso' ? '#dbeafe' : '#fef3c7',
                color: tarea.estado === 'completada' ? '#059669' : 
                       tarea.estado === 'en_progreso' ? '#1d4ed8' : '#d97706',
                fontSize: '0.7rem',
                height: '22px',
              }}
            />
            
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Today sx={{ fontSize: 14, color: '#64748b' }} />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: diasRestantes <= 1 ? '#ef4444' : 
                         diasRestantes <= 3 ? '#f59e0b' : '#64748b',
                  fontWeight: 500 
                }}
              >
                {diasRestantes}d
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ResumenSimple = ({ tareas }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = total - completadas;

  return (
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
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="#64748b" gutterBottom>
            Tareas asignadas
          </Typography>
          <Typography variant="h4" fontWeight={600} color="#0f172a">
            {total}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="#059669" fontWeight={600}>
              {completadas}
            </Typography>
            <Typography variant="caption" color="#64748b">
              Completadas
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="#f59e0b" fontWeight={600}>
              {pendientes}
            </Typography>
            <Typography variant="caption" color="#64748b">
              Pendientes
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default function ModuloTareasVendedor() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [tareas, setTareas] = useState(tareasVendedor);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleComplete = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id 
        ? { 
            ...tarea, 
            completada: !tarea.completada,
            estado: tarea.completada ? 'pendiente' : 'completada',
          }
        : tarea
    ));
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro !== 'todos') {
      if (filtro === 'completadas' && !tarea.completada) return false;
      if (filtro === 'pendientes' && tarea.completada) return false;
      if (filtro === 'progreso' && tarea.estado !== 'en_progreso') return false;
    }
    
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        tarea.titulo.toLowerCase().includes(searchLower) ||
        tarea.cliente.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <Sidebar>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={600} color="#0f172a" gutterBottom>
              <Assignment sx={{ 
                mr: 1.5, 
                verticalAlign: 'middle', 
                color: '#4f46e5',
                fontSize: '1.5rem'
              }} />
              Mis Tareas
            </Typography>
            <Typography variant="body2" color="#64748b">
              Tareas asignadas por el administrador
            </Typography>
          </Box>

          {isMobile && (
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                backgroundColor: '#f1f5f9',
                '&:hover': { backgroundColor: '#e2e8f0' }
              }}
            >
              <FilterList />
            </IconButton>
          )}
        </Stack>

        {/* Resumen simplificado */}
        <ResumenSimple tareas={tareas} />
      </Box>

      {/* Filtros */}
      {(showFilters || !isMobile) && (
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
              placeholder="Buscar tareas o clientes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
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
                label="Todas"
                clickable
                variant={filtro === 'todos' ? 'filled' : 'outlined'}
                onClick={() => setFiltro('todos')}
                size="small"
              />
              <Chip
                label="Pendientes"
                clickable
                variant={filtro === 'pendientes' ? 'filled' : 'outlined'}
                onClick={() => setFiltro('pendientes')}
                size="small"
              />
              <Chip
                label="En progreso"
                clickable
                variant={filtro === 'progreso' ? 'filled' : 'outlined'}
                onClick={() => setFiltro('progreso')}
                size="small"
              />
              <Chip
                label="Completadas"
                clickable
                variant={filtro === 'completadas' ? 'filled' : 'outlined'}
                onClick={() => setFiltro('completadas')}
                size="small"
              />
            </Stack>
          </Stack>
        </Paper>
      )}

      {/* Tareas */}
      <Box>
        <Typography variant="body2" color="#64748b" sx={{ mb: 2 }}>
          {tareasFiltradas.length} tareas mostradas
        </Typography>
        
        {tareasFiltradas.length > 0 ? (
          <Grid container spacing={2}>
            {tareasFiltradas.map((tarea) => (
              <Grid item xs={12} sm={6} md={4} key={tarea.id}>
                <TareaCard 
                  tarea={tarea} 
                  onToggleComplete={handleToggleComplete}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Assignment sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
            <Typography variant="body1" color="#475569" gutterBottom>
              No se encontraron tareas
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              {busqueda ? 'Intenta con otros términos de búsqueda' : 'No tienes tareas asignadas'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Sidebar>
  );
}