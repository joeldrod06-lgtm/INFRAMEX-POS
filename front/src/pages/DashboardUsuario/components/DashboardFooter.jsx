import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';

const DashboardFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2}
        justifyContent="space-between" 
        alignItems="center"
      >
        <Typography variant="body2" sx={{ 
          color: 'text.secondary', 
          fontSize: '0.85rem',
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          © {new Date().getFullYear()} INFAMEX S.L.U. • Sistema de Punto de Venta
        </Typography>
        
        <Stack direction="row" spacing={3}>
          <Link 
            href="#" 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.85rem',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            Política de privacidad
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.85rem',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            Términos de uso
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.85rem',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            Soporte técnico
          </Link>
        </Stack>
        
        <Typography variant="caption" sx={{ 
          color: 'text.disabled',
          fontSize: '0.75rem'
        }}>
          Versión 2.4.1 • Conectado
        </Typography>
      </Stack>
    </Box>
  );
};

export default DashboardFooter;