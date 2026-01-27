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
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const DashboardHeader = ({ 
  usuarioInfo, 
  isMobile, 
  handleDrawerToggle 
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <Toolbar sx={{ 
        minHeight: 70, 
        px: { xs: 2, md: 3 } 
      }}>
        {isMobile && (
          <IconButton 
            edge="start" 
            onClick={handleDrawerToggle} 
            sx={{ 
              mr: 2,
              color: 'text.secondary'
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            Panel de Control
          </Typography>
          <Typography variant="caption" sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem'
          }}>
            Dashboard principal • Sistema de Ventas
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip 
            label={usuarioInfo.sucursal}
            size="small"
            sx={{ 
              bgcolor: 'primary.50', 
              color: 'primary.600',
              fontWeight: 500,
              fontSize: '0.75rem',
              border: '1px solid',
              borderColor: 'primary.100',
              display: { xs: 'none', sm: 'flex' }
            }}
          />
          
          <IconButton 
            size="medium"
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Badge 
              badgeContent={3} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.6rem',
                  height: 16,
                  minWidth: 16
                }
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            p: 1,
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}>
            <Avatar sx={{ 
              width: 38, 
              height: 38, 
              bgcolor: 'primary.600',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              flexDirection: 'column' 
            }}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                lineHeight: 1.2,
                color: 'text.primary'
              }}>
                {usuarioInfo.nombre}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: 'text.secondary', 
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