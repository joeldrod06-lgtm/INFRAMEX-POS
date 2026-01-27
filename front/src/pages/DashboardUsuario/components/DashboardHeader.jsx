import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { colorPalette } from '../utils/colors';

const DashboardHeader = ({ 
  usuarioInfo, 
  isMobile, 
  mobileOpen, 
  handleDrawerToggle 
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: colorPalette.background,
        borderBottom: `1px solid ${colorPalette.border}`,
        color: colorPalette.textPrimary
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 } }}>
        {isMobile && (
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={handleDrawerToggle} 
            sx={{ 
              mr: 2,
              color: colorPalette.textSecondary
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap sx={{ 
            fontWeight: 600, 
            color: colorPalette.textPrimary,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            Dashboard
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip 
            label={usuarioInfo.sucursal}
            size="small"
            sx={{ 
              bgcolor: colorPalette.primaryLightest, 
              color: colorPalette.primary,
              fontWeight: 500,
              fontSize: '0.75rem',
              display: { xs: 'none', sm: 'flex' }
            }}
          />
          <IconButton 
            size="medium" 
            sx={{ 
              position: 'relative',
              color: colorPalette.textSecondary,
              '&:hover': {
                bgcolor: colorPalette.hoverBg
              }
            }}
          >
            <NotificationsIcon />
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                bgcolor: colorPalette.error,
                borderRadius: '50%'
              }}
            />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ 
              width: 36, 
              height: 36, 
              bgcolor: colorPalette.primary,
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              {usuarioInfo.nombre.charAt(0)}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                lineHeight: 1.2,
                color: colorPalette.textPrimary
              }}>
                {usuarioInfo.nombre}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: colorPalette.textSecondary, 
                lineHeight: 1.2 
              }}>
                {usuarioInfo.rol}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;