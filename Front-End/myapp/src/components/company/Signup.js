import React, { useState } from 'react'

import splashbg from '../../assets/splashbg.jpg'
import '../company/Signup.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup () {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cnfpassword, setCnfPassword] = useState('')

  const signupClickHandler = () => {
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      cnfpassword === ''
    ) {
      alert('All the fields are required')
    } else {
      if (password === cnfpassword) {
        try {
          const data = {
            name: name,
            email: email,
            phone: phone,
            password: password
          }
          axios
            .post('http://localhost:5000/auth/register/', data)
            .then(res => {
              console.log('res------>', res)
              if (res.data.message === 'This email is already exist') {
                alert('This email is already exist')
              } else if (res.data.message === 'User created successfully') {
                alert("Account created successfully")
                navigate('/emp-login')
              } else {
                alert('Something went wrong')
              }
            })
            .catch(err => {
              console.log('catch err===>', err)
            })
        } catch (err) {
          console.log('outer catch error--->', err)
        }
      } else {
        alert("passoword does't match")
      }
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${splashbg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
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
      <div className='signupDiv'>
        <p style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
          Signup here
        </p>
        <label style={{ marginTop: 20, color: 'white' }}>Name :</label>&nbsp;
        <input
          type='text'
          placeholder='Enter your name'
          onChange={e => setName(e.target.value)}
        /><br/>
        <label style={{ marginTop: 20, color: 'white' }}>Email :</label>&nbsp;
        <input
          type='text'
          placeholder='Enter your email'
          onChange={e => setEmail(e.target.value)}
        /><br/>
        <label style={{ marginTop: 20, color: 'white' }}>Phone :</label>&nbsp;
        <input
          type='text'
          placeholder='Enter phone number'
          onChange={e => setPhone(e.target.value)}
        /><br/>
        <label style={{ marginTop: 20, color: 'white' }}>Password :</label>&nbsp;
        <input
          type='text'
          placeholder='Enter password'
          onChange={e => setPassword(e.target.value)}
        /><br/>
        <label style={{ marginTop: 20, color: 'white' }}>Confirm password :</label>&nbsp;
        <input
          type='text'
          placeholder='Re-Enter passoword'
          onChange={e => setCnfPassword(e.target.value)}
        />
        <br /><br />
        <Button variant='primary' onClick={signupClickHandler}>
          Signup
        </Button>
        <p style={{ marginTop: 20, color: 'white' }}>
          I have already an account
        </p>
        <Link to={'/emp-login'}>Login</Link>
      </div>
    </div>
  )
}

export default Signup
