import Splash from './components/Splash'
import Login from './components/company/Login'
import Signup from './components/company/Signup'
import Home from './components/company/Home'
import Jobs from './components/company/Jobs'
import Profile from './components/company/Profile'
import Contact from './components/company/Contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmpInfo from './components/context/EmpInfo'
import { useEffect, useState } from 'react'
function App () {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <BrowserRouter>
     <EmpInfo>
      <Routes>
       
          <Route path='/' element={<Splash />} />
          <Route path='/emp-login' element={<Login />} />
          <Route path='/emp-signup' element={<Signup />} />

          <Route path='/emp-home' element={<Home />} />
          <Route path='/emp-jobs' element={<Jobs />} />
          <Route path='/emp-profile' element={<Profile />} />
          <Route path='/emp-contact' element={<Contact />} />
        
      </Routes>
      </EmpInfo>
    </BrowserRouter>
  )
}
export default App
