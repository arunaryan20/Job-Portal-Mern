import React, { useEffect, useState } from 'react'

import splashbg from '../../assets/splashbg.jpg'
import '../company/Profile.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import empContext from '../context/EmpContext'
import { useContext } from 'react'
import ProfileModal from '@material-ui/core/Modal'
import PasswordModal from '@material-ui/core/Modal'
function Profile ({ children }) {
  const navigate = useNavigate()
  const [data, setData] = useState('')

  const [pfopen, setPfOpen] = useState(false)
  const [psopen, setPsOpen] = useState(false)

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [name, setName] = useState()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const FetchData = async () => {
    try {
      axios
        .get('http://localhost:5000/profile/my-profile/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setData(res.data.data)
          setName(res.data.data[0].name)
          setEmail(res.data.data[0].email)
          setPhone(res.data.data[0].phone)
        })
        .catch(err => {
          console.log('enternal catch error--->', err)
        })
    } catch (err) {
      console.log('outer catch error--->', err)
    }
  }

  useEffect(() => {
    FetchData()
  }, [])

  //   profile modal functions

  const pfhandleClose = () => {
    setPfOpen(false)
  }

  const pfhandleOpen = () => {
    setPfOpen(true)
  }

    const updateSubmitClick=async()=>{
           try{
                   if(name==="" || email==="" || phone===""){
                    alert("All the fields are required")
                   }else{
                        const data={
                          name:name,
                          email:email,
                          phone:phone
                        }
                        await axios.patch("http://localhost:5000/profile/update-profile/",data,{
                          headers: { Authorization: `Bearer ${token}` }
                        }).then((res)=>{
                          if(res.data.message==="data updated succefully"){
                            alert("data updated succefully")
                          }else{
                            alert("Something is wrong")
                          }
                        }).catch((err)=>{
                          console.log("outer catch error--->",err)
                        })
                   }
           }catch(err){
            console.log("outer catch error---->",err)
           }
    }



  //   password modal functions

  const [oldpass, setOldPass] = useState('')
  const [newpass, setNewPass] = useState('')
  const [cnfpass, setCnfPass] = useState('')
  const passwordSubmitClick = () => {
    try {
      if (oldpass !== '' || newpass !== '' || cnfpass !== '') {
        if (newpass === cnfpass) {
          const passData = {
            oldPass: oldpass,
            newPass: newpass
          }
          axios
            .post('http://localhost:5000/auth/change-password/', passData, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
              if (res.data.message === 'password change successfully') {
                alert('Password change successfully')
              } else if (res.data.message === 'old password not matching') {
                alert('old password not matching')
              } else {
                alert('Something is wrong')
              }
            })
            .catch(err => {
              console.log('internal catch error', err)
            })
        } else {
          alert('New passoword and confirm password not matching')
        }
      }
    } catch (err) {
      console.log('Outer catch error-->', err)
    }
  }

  const pshandleClose = () => {
    setPsOpen(false)
  }

  const pshandleOpen = () => {
    setPsOpen(true)
  }

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
            <Nav className='me-auto'>
              <Nav.Link onClick={() => navigate('/emp-profile')}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/emp-jobs')}>Jobs</Nav.Link>
              <Nav.Link href='#pricing'>Contact us</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      {data!=="" &&(
      <div className='profileDiv'>
        <img
          src='https://cdn.mos.cms.futurecdn.net/pU9YyXKvbyUmmxoDx7bd28.jpg'
          style={{ height: 100, width: 100, borderRadius: 50, marginLeft: 90 }}
        />
        <label className='profileShowLavel'>Name : {data[0].name}</label>
        <label className='profileShowLavel'>Email : {data[0].email}</label>
        <label className='profileShowLavel'>Phone : {data[0].phone}</label>
        <br />
        <Button
          variant='success'
          className='profileUpdateBtn'
          onClick={pfhandleOpen}
        >
          Update profile
        </Button>{' '}
        <Button
          variant='success'
          className='profileUpdateBtn'
          onClick={pshandleOpen}
        >
          Change password
        </Button>{' '}
      </div>
      )}

      <ProfileModal
        onClose={pfhandleClose}
        open={pfopen}
        style={{
          position: 'absolute',
          border: '2px solid #000',
          backgroundColor: 'gray',
          // boxShadow: '2px solid black',
          height: 300,
          width: 300,
          margin: 'auto',
          padding: 10,
          borderRadius: 5
        }}
      >
        <div>
          <label className='profileShowLavel'>Name :</label>&nbsp;
          <input type='text' placeholder='Enter your name' value={name} onChange={e=>setName(e.target.value)} />
          <br />
          <br />
          <label className='profileShowLavel'>Email :</label>&nbsp;
          <input type='text' placeholder='Enter your email' value={email} onChange={e=>setEmail(e.target.value)} />
          <br />
          <br />
          <label className='profileShowLavel'>Phone :</label>&nbsp;
          <input type='text' placeholder='Enter phone' value={phone} onChange={e=>setPhone(e.target.value)} />
          <br />
          <br />
          <Button
            variant='success'
            className='profileUpdateBtn'
            onClick={updateSubmitClick}
          >
            Submit
          </Button>{' '}
        </div>
        
      </ProfileModal>

      <PasswordModal
        onClose={pshandleClose}
        open={psopen}
        style={{
          position: 'absolute',
          border: '2px solid #000',
          backgroundColor: 'gray',
          // boxShadow: '2px solid black',
          height: 400,
          width: 300,
          margin: 'auto',
          padding: 10,
          borderRadius: 5
        }}
      >
        <div>
          <label className='profileShowLavel'>Old Password :</label>&nbsp;
          <input
            type='text'
            placeholder='Enter old password'
            onChange={e => setOldPass(e.target.value)}
          />
          <br />
          <br />
          <label className='profileShowLavel'>New Password :</label>&nbsp;
          <input
            type='text'
            placeholder='Enter new password'
            onChange={e => setNewPass(e.target.value)}
          />
          <br />
          <br />
          <label className='profileShowLavel'>Confirm Password :</label>&nbsp;
          <input
            type='password'
            placeholder='Re-enter password'
            onChange={e => setCnfPass(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant='success'
            className='profileUpdateBtn'
            onClick={passwordSubmitClick}
          >
            Submit
          </Button>{' '}
        </div>
      </PasswordModal>
    </div>
  )
}

export default Profile
