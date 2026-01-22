import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Prueba from './pages/PaginaPrueba'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/prueba" element={<Prueba />} />
    </Routes>
  )
}
