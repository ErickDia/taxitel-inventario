
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import { Productos } from './Productos'

export const RouterPanel = () => {
  return (

    <Routes>
        <Route path='/productos' element={<Productos />} />
        <Route path='/home' element={<Home />} />
        <Route path='/*' element={<Home />} />
    </Routes>
  )
}
