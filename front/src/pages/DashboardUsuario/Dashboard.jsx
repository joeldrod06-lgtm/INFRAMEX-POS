import React from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../shared/components/SideBar';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';

// Datos del dashboard
import { 
  usuarioInfo, 
  tareasUsuario, 
  ventasCredito, 
  resumenComisiones,
  kpis,
  estadisticasRapidas 
} from './utils/mockData';

export default function DashboardUsuario() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      bgcolor: 'neutral.50'
    }}>
      <Sidebar />

      <Box component="main" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <DashboardHeader
          usuarioInfo={usuarioInfo}
          isMobile={isMobile}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Container maxWidth="xl" sx={{ 
          flex: 1, 
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 }
        }}>
          <DashboardContent
            usuarioInfo={usuarioInfo}
            tareasUsuario={tareasUsuario}
            ventasCredito={ventasCredito}
            resumenComisiones={resumenComisiones}
            kpis={kpis}
            estadisticasRapidas={estadisticasRapidas}
            navigate={navigate}
          />
        </Container>

        <DashboardFooter />
      </Box>
    </Box>
  );
}