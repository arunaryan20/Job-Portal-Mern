import React from 'react'
import Button from 'react-bootstrap/Button'
function UpdateJob() {
  return (
    <div>
         <div>
         <label className='jobPostLabel'>Job Title :</label>&nbsp;
            <input type='text' placeholder='Enter job title' />
            <br />
            <br />
            <label className='jobPostLabel'>Job Type :</label>&nbsp;
            <select name='cars' id='cars'>
              <option value='Full-Time'>Full-Time</option>
              <option value='Part-Time'>Part-Time</option>
              <option value='Internship'>Internship</option>
              <option value='Contract'>Contract</option>
            </select>
            <br />
            <br />
            <label className='jobPostLabel'>Job Location :</label>&nbsp;
            <input type='text' placeholder='Enter job location' />
            <br />
            <br />
            <label className='jobPostLabel'>Salary :</label>&nbsp;
            <input type='text' placeholder='Enter salary' />
            <br />
            <br />
            <label className='jobPostLabel'>Company Name :</label>&nbsp;
            <input type='text' placeholder='Enter company name' />
            <br />
            <br />
            <label className='jobPostLabel'>Job Description :</label>
            <br />
            <textarea
              type='box'
              placeholder='Enter job details'
              style={{ height: 90, width: 350 }}
            />
            <br />
            <br />
            <label className='jobPostLabel'>Company Linkedin :</label>&nbsp;
            <input type='text' placeholder='Company&#39;s linkedin' />
            <br />
            <br />
            <label className='jobPostLabel'>Company Website :</label>&nbsp;
            <input type='text' placeholder='Company&#39;s website' />
            <br />
            <br />
            <Button variant='success' className='createJobSubmitBtn'>
              Submit
            </Button>{' '}
         </div>
    </div>
  )
}

export default UpdateJob
