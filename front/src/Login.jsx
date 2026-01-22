import * as React from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  alpha,
  styled,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonOutline,
  LockOutlined,
  ArrowForward as ArrowForwardIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

// Componentes personalizados responsive
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: '#ffffff',
  border: `1px solid ${alpha('#e5e7eb', 0.8)}`,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 420,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: '#f9fafb',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      '& fieldset': {
        borderColor: '#d1d5db',
      }
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#2563eb',
        borderWidth: '2px'
      }
    },
    '& fieldset': {
      borderColor: '#e5e7eb',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px', // Evita zoom en iOS
      '& input': {
        fontSize: '16px'
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: '#6b7280',
    fontSize: '0.95rem',
    '&.Mui-focused': {
      color: '#2563eb',
      fontWeight: 500
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem'
    }
  },
  '& .MuiOutlinedInput-input': {
    color: '#111827',
    fontSize: '0.95rem',
    padding: '12px 14px',
    [theme.breakpoints.down('sm')]: {
      padding: '14px 16px',
      fontSize: '1rem'
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: '#2563eb',
  color: '#ffffff',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#1d4ed8',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
  },
  '&:active': {
    transform: 'translateY(0)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    fontSize: '1rem'
  }
}));

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    usuario: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/prueba');
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 0 : 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <GradientPaper
        component="form"
        onSubmit={handleSubmit}
        elevation={isMobile ? 0 : 1}
        sx={{
          width: '100%',
          p: isMobile ? 3 : 4,
          borderRadius: isMobile ? 0 : 2,
          boxShadow: isMobile ? 'none' : '0 10px 25px rgba(0, 0, 0, 0.05)',
          minHeight: isMobile ? '100vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}
      >
        {/* Encabezado */}
        <Box 
          textAlign="center" 
          mb={isMobile ? 3 : 4}
          sx={{
            position: 'relative'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: isMobile ? 1.5 : 2,
              gap: 1
            }}
          >
            <InventoryIcon 
              sx={{
                fontSize: isMobile ? 40 : 48,
                color: '#2563eb',
                mr: 1
              }}
            />
            <LocalShippingIcon 
              sx={{
                fontSize: isMobile ? 36 : 40,
                color: '#4f46e5'
              }}
            />
          </Box>
          
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="800"
            sx={{
              color: '#111827',
              letterSpacing: '-0.025em',
              mb: 1,
              fontSize: isMobile ? '1.75rem' : '2.25rem'
            }}
          >
            INFAMEX
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{
              color: '#6b7280',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: 400
            }}
          >
            Sistema de Gestión Comercial
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 1,
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              fontSize: isMobile ? '0.8rem' : '0.875rem'
            }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Campos del Formulario */}
        <Box sx={{ mb: 1, flex: 1 }}>
          <StyledTextField
            fullWidth
            name="usuario"
            label="Usuario"
            value={formData.usuario}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline sx={{ 
                    color: '#9ca3af',
                    fontSize: isMobile ? '1.1rem' : '1.25rem'
                  }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                fontWeight: 500
              }
            }}
          />

          <StyledTextField
            fullWidth
            name="password"
            type="password"
            label="Contraseña"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ 
                    color: '#9ca3af',
                    fontSize: isMobile ? '1.1rem' : '1.25rem'
                  }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                fontWeight: 500
              }
            }}
          />
        </Box>

        {/* Helper Text */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#6b7280',
            mt: 2,
            fontSize: isMobile ? '0.75rem' : '0.8rem',
            lineHeight: 1.4
          }}
        >
          Acceso requiere identificación del servidor
        </Typography>

        {/* Botón de Submit */}
        <SubmitButton
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          endIcon={!loading && !isMobile && <ArrowForwardIcon />}
          sx={{
            mt: 4,
            py: isMobile ? 1.8 : 1.5,
            borderRadius: 2,
            fontSize: isMobile ? '1rem' : '1rem',
            fontWeight: 600,
            textTransform: 'none',
            minHeight: isMobile ? '56px' : '48px'
          }}
        >
          {loading ? (
            <CircularProgress 
              size={isMobile ? 26 : 24} 
              sx={{ 
                color: 'white'
              }} 
            />
          ) : (
            isMobile ? 'ACCEDER' : 'ACCEDER AL SISTEMA'
          )}
        </SubmitButton>

        {/* Footer */}
        <Box 
          mt={isMobile ? 3 : 4} 
          pt={isMobile ? 2 : 3} 
          sx={{ 
            borderTop: `1px solid ${alpha('#e5e7eb', 1)}`,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              display: 'block'
            }}
          >
            © 2026 INFAMEX S.L.U.
          </Typography>
          <Link
            href="#"
            variant="caption"
            sx={{
              color: '#2563eb',
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Políticas de privacidad
          </Link>
        </Box>
      </GradientPaper>
    </Box>
  );
}