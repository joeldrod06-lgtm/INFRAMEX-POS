import { Routes, Route } from 'react-router-dom';
import Login from './shared/components/Login';
import Dashboard from './pages/DashboardUsuario/Dashboard';
import Productos from './pages/Productos/Productos';
import Tareas from './pages/Tareas/Tareas';
import Comision from './pages/Comisiones/Comision';
import Cliente from './pages/Clientes/Clientes'
import Ventas from './pages/Ventas/Ventas'
import POS from './pages/POS/PuntodeVenta';
import { Configuration } from './pages/Configuration/Configuration';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/tareas" element={<Tareas />} />
      <Route path="/comisiones" element={<Comision />} />
      <Route path="/clientes" element={<Cliente />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/pos" element={<POS />} />
      <Route path='/configuracion' element={<Configuration />} />

    </Routes>
  );
}
