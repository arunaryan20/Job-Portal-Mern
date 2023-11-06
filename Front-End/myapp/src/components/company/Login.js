import React, { useEffect, useState } from 'react'

import splashbg from '../../assets/splashbg.jpg'
import '../company/Login.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import empContext from '../context/EmpContext'
import { useContext } from 'react'
function Login ({children}) {
  var {data,updateData}=useContext(empContext)

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [empdata, setEmpData] = useState(null)
 const handleUpdateData=(newData)=>{
       updateData(newData)
 }

  const signinClickHandler = async () => {
    if (email === '' || password === '') {
      alert('All fields are required')
    } else {
      try {
        const data = {
          email: email,
          password: password
        }
        await axios
          .post('http://localhost:5000/auth/login/', data)
          .then(res => {
            if (res.data.message === 'login successfull') {
              handleUpdateData(res)
              localStorage.setItem('token',res.data.token);
              navigate('/emp-home')
            } else if (res.data.message === 'passoword is not matching') {
              alert('passoword is not matching')
            } else if (res.data.message === 'User does not exit') {
              alert('User does not exit')
            } else {
              alert('Something went wrong')
            }
          })
          .catch(err => {
            console.log('catch err===>', err)
          })

        //  fetch("http://localhost:5000/auth/login/",{
        //   method:"POST",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify(data)
        //  }).then((res)=>{
        //   res.json().then((data)=>{
        //     console.log("data----->",data)
        //   }).catch((err)=>{
        //     console.log("data error--->",err)
        //   })
        //  }).catch((err)=>{
        //   console.log("error----->",err)
        //  })
      } catch (err) {
        console.log('outer catch err', err)
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
        height: '110vh'
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
      <div className='btnDiv1'>
        <p style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
          Login here
        </p>
        <p style={{ marginTop: 20, color: 'white' }}>Email</p>
        <input
          type='text'
          placeholder='Enter your email'
          onChange={e => setEmail(e.target.value)}
        />
        <p style={{ marginTop: 20, color: 'white' }}>Password</p>
        <input
          type='text'
          placeholder='Enter password'
          onChange={e => setPassword(e.target.value)}
        />
        <br /> <br />
        <Button variant='primary' onClick={signinClickHandler}>
          Login
        </Button>
        <p style={{ marginTop: 20, color: 'white' }}>I do'nt have an account</p>
        <Link to='/emp-signup'>Signup</Link>
      </div>
    </div>
  )
}

export default Login
