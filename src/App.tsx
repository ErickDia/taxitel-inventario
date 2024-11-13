
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './app/login/Login.tsx'
import { RouterPanel } from './app/dashboard/RouterPanel.tsx'

function App() {

  return (
    <>
      <Routes>
          <Route path='/dashboard/*' element={<RouterPanel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Login/>} />
      </Routes>
      
    </>
  )
}

export default App
