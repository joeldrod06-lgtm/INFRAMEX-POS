import React from 'react';
import { Box, Typography } from '@mui/material';
import { colorPalette } from '../utils/colors';

const DashboardFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        bgcolor: colorPalette.background,
        borderTop: `1px solid ${colorPalette.border}`
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Typography variant="body2" sx={{ 
          color: colorPalette.textSecondary, 
          fontSize: '0.85rem' 
        }}>
          © {new Date().getFullYear()} INFAMEX S.L.U. - Panel de Vendedor
        </Typography>
        <Typography variant="caption" sx={{ 
          color: colorPalette.textSecondary,
          fontSize: '0.75rem'
        }}>
          Última actualización: Hoy, 10:30 AM
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardFooter;