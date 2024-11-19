
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { RouterPanel } from './app/dashboard/RouterPanel.tsx'

function App() {

  return (
    <>
      <Routes>
          <Route path='/dashboard/*' element={<RouterPanel />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Login/>} /> */}
          <Route path='/login' element={<Navigate to="/dashboard/home" />} />
          <Route path='/*' element={<Navigate to="/dashboard/home" />} />
          
      </Routes>
      
    </>
  )
}

export default App
