import React, { useState, useEffect } from 'react'

import splashbg from '../../assets/splashbg.jpg'
import '../company/Login.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'
import UpdateJob from './UpdateJob'
import Modal from '@material-ui/core/Modal'
import axios from 'axios'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom'


function Jobs () {
  const navigate=useNavigate()
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [job, setJob] = useState(null)

  const fetchData = async () => {
    try {
      await axios
        .get('http://localhost:5000/job/all-jobs/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          let size = res.data.jobs.length
          setJob(res.data.jobs)
        })
        .catch(err => {
          console.log('catch error-->', err)
        })
    } catch (err) {
      console.log('outer catch error--->', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
      


  const deleteClickHandler=(data)=>{
             try{
              if(window.confirm("Do you want to delete it")){
                  axios.delete("http://localhost:5000/job/delete-job/"+data, {
                    headers: { Authorization: `Bearer ${token}` }
                  }).then((res)=>{
                     if(res.data.message==="job deleted"){
                      alert("Job deleted successfully")
                      fetchData()
                     }
                  }).catch((err)=>{
                    console.log("catch error--->",err)
                  })   
              }
             }catch(err){
                console.log("outer catch error---->",err)
             }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

 // update states
 const [jobid, setJobId] = useState("")
 const [upjobtitle, setUpJobTitle] = useState("")
 const [upjobtype, setUpJobType] = useState('')
 const [upjoblocation, setUpJobLocation] = useState('')
 const [upsalary, setUpSalary] = useState('')
 const [upcompname, setUpCompanyName] = useState('')
 const [upjobdesc, setUpJobDesc] = useState('')
 const [upcomplinkedin, setUpCompLinkedin] = useState('')
 const [upcompwebsite, setUpCompWebsite] = useState('')





const updateClickHandler=(x)=>{
  handleOpen()
  setJobId(x._id)
  setUpJobTitle(x.jobTitle)
  setUpJobType(x.workType)
  setUpJobLocation(x.workLocation)
  setUpSalary(x.salary)
  setUpCompanyName(x.companyName)
  setUpJobDesc(x.jobDesc)
  setUpCompLinkedin(x.compLinkedin)
  setUpCompWebsite(x.compWebsite)
}

const submitUpdateClick=()=>{
    try{
          
      const data = {
        jobTitle: upjobtitle,
        workType: upjobtype,
        workLocation: upjoblocation,
        salary: upsalary,
        companyName: upcompname,
        jobDesc: upjobdesc,
        compLinkedin: upcomplinkedin,
        compWebsite: upcompwebsite
      }
      axios
        .patch('http://localhost:5000/job/update-job/'+jobid, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.data.message === 'job updated') {
            alert('Job updated successfully')
            fetchData()
          } else {
            alert('Something is wrong')
          }
        })
        .catch(err => {
          console.log('internal catch error', err)
        })


    }catch(err){
      console.log("outer catch error----->",err)
    }

}

// Search 

const [searchtext,setSearchText]=useState("")

const searchClickHandler=async()=>{
          try{
           await axios
            .get('http://localhost:5000/job/my-data?search='+searchtext, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
              if (res.data.message === 'data searched by you') {
                 setJob(res.data.data)
                
              } else {
                alert('Something is wrong')
              }
            })
            .catch(err => {
              console.log('internal catch error', err)
            })      
            

          }catch(err){
               console.log("outer catch error---->",err)
          } 
}


  return (
    <div
      style={{
        backgroundImage: `url(${splashbg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        height: 'auto',
        minHeight: '100vh'
      }}
    >
      <div>
        <Navbar  bg='dark'
          data-bs-theme='dark'
          className='homeNavbar'
          fixed='top'
          style={{ opacity: 0.9 }}>
          <Container>
            <Navbar.Brand className='spHeader'>Hiring Freshers</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link  onClick={() => navigate('/emp-profile')}>Profile</Nav.Link>
              <Nav.Link onClick={() => navigate('/emp-jobs')}>Jobs</Nav.Link>
              <Nav.Link href='#pricing'>Contact us</Nav.Link>
            </Nav>
            <input
              type='search'
              className='form-control rounded'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='search-addon'
              style={{ width: 250, marginLeft: 50 }}
              onChange={e=>setSearchText(e.target.value)}
            />
            <button
              type='button'
              className='btn btn-outline-primary'
              style={{ marginLeft: 10 }}
              onClick={searchClickHandler}
            >
              search
            </button>
          </Container>
        </Navbar>
      </div>
      <p
        style={{ color: 'white', fontWeight: '500', fontSize: 22, padding: 10,marginTop:70 }}
      >
        All Jobs
      </p>
      <div style={{ padding: 5, marginBottom:20,marginLeft:150}}>
        <Grid
          
          container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 1 }}
        >
           {job != null &&
            job.map((item, index) => (
            <Grid item xs={5} key={index}>
             
             <Card style={{ width: '30rem', }}>
              <Card.Body>
                <Card.Title style={{ fontWeight: '500', color: 'black' }}>
                 {item.jobTitle}
                </Card.Title>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Job Type : {item.workType}
                </Card.Subtitle>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Job Location : {item.workLocation}
                </Card.Subtitle>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Salary : {item.salary}
                </Card.Subtitle>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Company Name : {item.companyName}
                </Card.Subtitle>
                <Card.Text style={{ color: 'black' }}>
                  <label className='homeJobDescLabel'>
                    <b>Job Description : </b>
                  </label>
                  &nbsp; {item.jobDesc}
                </Card.Text>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Company's Linkedin Profile :{' '}
                  <a href= {item.compLinkedin}>
                   {item.compLinkedin}
                  </a>
                </Card.Subtitle>
                <Card.Subtitle className='home-mb-2-text-muted'>
                  Company's Website :{' '}
                  <a href= {item.compWebsite}>
                    {item.compWebsite}
                  </a>
                </Card.Subtitle>
                <br />
                <Button variant='success' onClick={()=>updateClickHandler(item)}>
                  Update
                </Button>{' '}
                <Button variant='danger' onClick={()=>deleteClickHandler(item._id)} >Delete</Button>{' '}
              </Card.Body>
            </Card>

            </Grid>
          ))}
        </Grid>

        
      </div>
      <Modal
        onClose={handleClose}
        open={open}
        style={{
          position: 'absolute',
          border: '2px solid #000',
          backgroundColor: 'gray',
          // boxShadow: '2px solid black',
          // height: 80,
          width: 500,
          margin: 'auto',
          padding: 10,
          borderRadius: 5
        }}
      >
        <div>
          <label className='jobPostLabel'>Job Title :</label>&nbsp;
          <input type='text' placeholder='Enter job title' value={upjobtitle} onChange={e=>setUpJobTitle(e.target.value)} />
          <br />
          <br />
          <label className='jobPostLabel'>Job Type :</label>&nbsp;
          <select name='cars' id='cars' value={upjobtype} onChange={e=>setUpJobType(e.target.value)}>
            <option value='Full-Time'>Full-Time</option>
            <option value='Part-Time'>Part-Time</option>
            <option value='Internship'>Internship</option>
            <option value='Contract'>Contract</option>
          </select>
          <br />
          <br />
          <label className='jobPostLabel'>Job Location :</label>&nbsp;
          <input type='text' placeholder='Enter job location' value={upjoblocation} onChange={e=>setUpJobLocation(e.target.value)} />
          <br />
          <br />
          <label className='jobPostLabel'>Salary :</label>&nbsp;
          <input type='text' placeholder='Enter salary' value={upsalary} onChange={e=>setUpSalary(e.target.value)} />
          <br />
          <br />
          <label className='jobPostLabel'>Company Name :</label>&nbsp;
          <input type='text' placeholder='Enter company name' value={upcompname} onChange={e=>setUpCompanyName(e.target.value)} />
          <br />
          <br />
          <label className='jobPostLabel'>Job Description :</label>
          <br />
          <textarea
            type='box'
            placeholder='Enter job details'
            value={upjobdesc} onChange={e=>setUpJobDesc(e.target.value)}
            style={{ height: 90, width: 350 }}
          />
          <br />
          <br />
          <label className='jobPostLabel'>Company Linkedin :</label>&nbsp;
          <input type='text' placeholder='Company&#39;s linkedin' value={upcomplinkedin} onChange={e=>setUpCompLinkedin(e.target.value)} />
          <br />
          <br />
          <label className='jobPostLabel'>Company Website :</label>&nbsp;
          <input type='text' placeholder='Company&#39;s website' value={upcompwebsite} onChange={e=>setUpCompWebsite(e.target.value)} />
          <br />
          <br />
          <Button variant='success' className='createJobSubmitBtn' onClick={submitUpdateClick}>
            Submit
          </Button>{' '}
        </div>
      </Modal>
    </div>
  )
}

export default Jobs
