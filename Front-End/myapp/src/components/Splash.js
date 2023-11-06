import React from 'react'
import splashbg from '../assets/splashbg.jpg'
import '../components/Splash.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router-dom'
function Splash () {
  const navigate=useNavigate()
  return (
    <div
      style={{
        backgroundImage: `url(${splashbg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
        // marginTop: '-20px'
      }}
    >
      <div>
        <Navbar
          expand='lg'
          className='bg-body-tertiary'
          bg='dark'
          data-bs-theme='dark'
        >
          <Container>
            <Navbar.Brand className='spHeader'>Hiring Freshers</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className='btnDiv'>
        <p style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
          You are:-{' '}
        </p>
        <Button variant='primary' onClick={()=>navigate("emp-login")}>Company</Button> &nbsp;
        <Button variant='secondary'>Student</Button>{' '}
      </div>
    </div>
  )
}

export default Splash
