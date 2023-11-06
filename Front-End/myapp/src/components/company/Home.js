import React, { useEffect, useState } from 'react'

import splashbg from '../../assets/splashbg.jpg'
import '../company/Login.css'
import '../company/Home.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import UpdateJob from './UpdateJob'
import Modal from '@material-ui/core/Modal'
import axios from 'axios'
import { useContext } from 'react'
import empContext from '../context/EmpContext'
function Home () {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/emp-login")
    }
  },[])
  const [token, setToken] = useState(localStorage.getItem('token'))
  var { data, updateData } = useContext(empContext)
  const [job, setJob] = useState(null)

     // update states
  const [upjobtitle, setUpJobTitle] = useState()
  const [upjobtype, setUpJobType] = useState('')
  const [upjoblocation, setUpJobLocation] = useState('')
  const [upsalary, setUpSalary] = useState('')
  const [upcompname, setUpCompanyName] = useState('')
  const [upjobdesc, setUpJobDesc] = useState('')
  const [upcomplinkedin, setUpCompLinkedin] = useState('')
  const [upcompwebsite, setUpCompWebsite] = useState('')


  const fetchData = async () => {
   
    try {
      await axios
        .get('http://localhost:5000/job/all-jobs/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          let size = res.data.jobs.length
          setJob(res.data.jobs[size - 1])
          setUpJobTitle(res.data.jobs[size - 1].jobTitle)
          setUpJobType(res.data.jobs[size - 1].workType)
          setUpJobLocation(res.data.jobs[size - 1].workLocation)
          setUpSalary(res.data.jobs[size - 1].salary)
          setUpCompanyName(res.data.jobs[size - 1].companyName)
          setUpJobDesc(res.data.jobs[size - 1].jobDesc)
          setUpCompLinkedin(res.data.jobs[size - 1].compLinkedin)
          setUpCompWebsite(res.data.jobs[size - 1].compWebsite)
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

// update function

  const updateSubmitHandler=async(x)=>{
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
            .patch('http://localhost:5000/job/update-job/'+x, data, {
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
            console.log("Outer catch error--->",err)
        }
  }

  //job post states
  const [open, setOpen] = useState(false)
  const [jobtitle, setJobTitle] = useState('')
  const [jobtype, setJobType] = useState('')
  const [joblocation, setJobLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [compname, setCompanyName] = useState('')
  const [jobdesc, setJobDesc] = useState('')
  const [complinkedin, setCompLinkedin] = useState('')
  const [compwebsite, setCompWebsite] = useState('')
     

  const createJobClick = () => {
    try {
      if (
        jobtitle === '' ||
        joblocation === '' ||
        salary === '' ||
        compname === '' ||
        jobdesc === '' ||
        complinkedin === '' ||
        compwebsite === ''
      ) {
        alert('All fields are required')
      } else {
        const data = {
          jobTitle: jobtitle,
          workType: jobtype,
          workLocation: joblocation,
          salary: salary,
          companyName: compname,
          jobDesc: jobdesc,
          compLinkedin: complinkedin,
          compWebsite: compwebsite
        }
        axios
          .post('http://localhost:5000/job/create-job/', data, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            if (res.data.message === 'job created') {
              alert('Job created successfully')
              fetchData()
            } else {
              alert('Something is wrong')
            }
          })
          .catch(err => {
            console.log('internal catch error', err)
          })
      }
    } catch (err) {
      console.log('outer catch error', err)
    }
  }

  const deleteClickHandler = data => {
    try {
      if (window.confirm('Do you want to delete it')) {
        axios
          .delete('http://localhost:5000/job/delete-job/' + data, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            if (res.data.message === 'job deleted') {
              alert('Job deleted successfully')
              fetchData()
            }
          })
          .catch(err => {
            console.log('catch error--->', err)
          })
      }
    } catch (err) {
      console.log('outer catch error---->', err)
    }
  }

  const logoutClickHandler = () => {
    localStorage.removeItem('token')
    navigate('/emp-login')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div
      style={{
        backgroundImage: `url(${splashbg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 'auto',
        minHeight: '110vh'
        // marginTop: '-20px'
      }}
    >
      <div>
        <Navbar
          bg='dark'
          data-bs-theme='dark'
          className='homeNavbar'
          fixed='top'
          style={{ opacity: 0.9 }}
        >
          <Container>
            <Navbar.Brand className='spHeader'>Hiring Freshers</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link onClick={() => navigate('/emp-profile')}>Profile</Nav.Link>
              <Nav.Link onClick={() => navigate('/emp-jobs')}>Jobs</Nav.Link>
              <Nav.Link onClick={()=>navigate('/emp-contact')}>Contact us</Nav.Link>
            </Nav>
            <button
              type='button'
              className='btn btn-outline-primary'
              style={{ marginLeft: 350 }}
              onClick={logoutClickHandler}
            >
              Logout
            </button>
          </Container>
        </Navbar>
      </div>

      <div className='homeMainDiv'>
        <div>
          <p
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 22,
              padding: 10
            }}
          >
            Post your job
          </p>
          <div className='postJobDiv'>
            <label className='jobPostLabel'>Job Title :</label>&nbsp;
            <input
              type='text'
              placeholder='Enter job title'
              onChange={e => setJobTitle(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Job Type :</label>&nbsp;
            <select
              name='cars'
              id='jobs'
              onChange={e => setJobType(e.target.value)}
            >
              <option value='Full-Time'>Full-Time</option>
              <option value='Part-Time'>Part-Time</option>
              <option value='Internship'>Internship</option>
              <option value='Contract'>Contract</option>
            </select>
            <br />
            <br />
            <label className='jobPostLabel'>Job Location :</label>&nbsp;
            <input
              type='text'
              placeholder='Enter job location'
              onChange={e => setJobLocation(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Salary :</label>&nbsp;
            <input
              type='text'
              placeholder='Enter salary'
              onChange={e => setSalary(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Company Name :</label>&nbsp;
            <input
              type='text'
              placeholder='Enter company name'
              onChange={e => setCompanyName(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Job Description :</label>
            <br />
            <textarea
              type='box'
              placeholder='Enter job details'
              style={{ height: 90, width: 350 }}
              onChange={e => setJobDesc(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Company Linkedin :</label>&nbsp;
            <input
              type='text'
              placeholder='Company&#39;s linkedin'
              onChange={e => setCompLinkedin(e.target.value)}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Company Website :</label>&nbsp;
            <input
              type='text'
              placeholder='Company&#39;s website'
              onChange={e => setCompWebsite(e.target.value)}
            />
            <br />
            <br />
            <Button
              variant='success'
              className='createJobSubmitBtn'
              onClick={createJobClick}
            >
              Submit
            </Button>{' '}
          </div>
        </div>
        <div>
          <p
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 22,
              padding: 10,
              marginLeft: 100
            }}
          >
            Recently added job
          </p>
          <div className='homeRecentylyAddedJobDiv'>
            {job !== null && (
              <Card style={{ width: '30rem' }}>
                <Card.Body>
                  <Card.Title style={{ fontWeight: '500', color: 'black' }}>
                    {job.jobTitle}
                  </Card.Title>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Job Type :{job.workType}
                  </Card.Subtitle>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Job Location : {job.workLocation}
                  </Card.Subtitle>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Salary : {job.salary}
                  </Card.Subtitle>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Company Name : {job.companyName}
                  </Card.Subtitle>
                  <Card.Text style={{ color: 'black' }}>
                    <label className='homeJobDescLabel'>
                      <b>Job Description : </b>
                    </label>
                    &nbsp;{job.jobDesc}
                  </Card.Text>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Company's Linkedin Profile :{' '}
                    <a href={job.compLinkedin}>{job.compLinkedin}</a>
                  </Card.Subtitle>
                  <Card.Subtitle className='home-mb-2-text-muted'>
                    Company's Website :{' '}
                    <a href={job.compWebsite}>{job.compWebsite}</a>
                  </Card.Subtitle>
                  <br />
                  <Button variant='success' onClick={handleOpen}>
                    Update
                  </Button>{' '}
                  <Button
                    variant='danger'
                    onClick={() => deleteClickHandler(job._id)}
                  >
                    Delete
                  </Button>{' '}
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
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
        {job!=null && (
        <div>
          <label className='jobPostLabel'>Job Title :</label>&nbsp;
          <input
            type='text'
            placeholder='Enter job title'
            value={upjobtitle}
            onChange={e => setUpJobTitle(e.target.value)}
          />
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
            value={upjobdesc}
            placeholder='Enter job details'
            style={{ height: 90, width: 350 }}
            onChange={e=>setUpJobDesc(e.target.value)}
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
          <Button variant='success' className='createJobSubmitBtn' onClick={()=>updateSubmitHandler(job._id)}>
            Submit
          </Button>{' '}
        </div>
        )}
      </Modal>
    </div>
  )
}

export default Home
