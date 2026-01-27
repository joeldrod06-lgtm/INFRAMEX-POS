import { Routes, Route } from 'react-router-dom'
import Login from './shared/components/Login'
import Dashboard from './pages/DashboardUsuario/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='PuntodeVenta' /> 
    </Routes>
  )
}
