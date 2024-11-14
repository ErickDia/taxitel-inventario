
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Productos } from './Productos'
import { Categorias } from './Categorias'
import { Reporte } from './Reporte'
import { Clientes } from './Clientes'


export const RouterPanel = () => {
  return (
    <Routes>
        <Route path='/productos' element={<Productos />} />
        <Route path='/categorias' element={<Categorias />} />
        <Route path='/reporte' element={<Reporte />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/home' element={<Home />} />
        <Route path='/*' element={<Home />} />
    </Routes>
  )
}
