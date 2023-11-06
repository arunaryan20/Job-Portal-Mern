const jobsModel = require('../models/jobsModel')
const jwt = require('jsonwebtoken')

const createJob = async (req, res) => {
  try {
    var {
      jobTitle,
      workType,
      workLocation,
      salary,
      companyName,
      jobDesc,
      compLinkedin,
      compWebsite
    } = req.body
    if (
      !jobTitle ||
      !workLocation ||
      !salary ||
      !companyName ||
      !jobDesc ||
      !compLinkedin ||
      !compWebsite
    ) {
      res
        .status(400)
        .json({ success: false, message: 'All fields are require' })
    } else {
      jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
          res.status(400).json({ success: false, message: 'token not valid' })
        } else {
          req.body.createdBy = authData.data._id
          const job = await jobsModel.create(req.body)
          res
            .status(201)
            .json({ success: true, message: 'job created', job: job })
        }
      })
    }
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: 'create job controller error',
        error: error
      })
  }
}

const getAllJobs = async (req, res) => {
  try {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
      if (err) {
        res
          .status(400)
          .json({
            success: false,
            message: 'get all jobs jwt verify error',
            error: err
          })
      } else {
        const allJob = await jobsModel.find({ createdBy: authData.data._id })
        res
          .status(200)
          .json({ success: true, message: 'All jobs ', jobs: allJob })
      }
    })
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: 'get all jobs controller error',
        error: err
      })
  }
}

const updateJob = async (req, res) => {
  try {
    var { id } = req.params
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
      if (err) {
        res
          .status(400)
          .json({
            success: false,
            message: 'update job token error',
            error: err
          })
      } else {
        const updated_job = await jobsModel.findOneAndUpdate(
          { _id: id },
          req.body,
          {
            new: true,
            runValidators: true
          }
        )
        res
          .status(200)
          .json({ success: true, message: 'job updated', job: updated_job })
      }
    })
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: 'update job controller error',
        error: error
      })
  }
}
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
      if (err) {
        res
          .status(400)
          .json({
            success: false,
            message: 'delete job controller token error',
            error: err
          })
      } else {
        const job = await jobsModel.findByIdAndDelete({ _id: id })
        if (job) {
          res.status(200).json({ success: true, message: 'job deleted' })
        } else {
          res.status(200).json({ success: true, message: 'job not found' })
        }
      }
    })
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: 'delete job controller error',
        error: error
      })
  }
}

const searchController = async (req, res) => {
  try {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
      var search=""
      if(req.query.search){
         search=req.query.search
      }
      
      
      const userData=await jobsModel.find({
         $or:[
             {jobTitle:{$regex:".*"+search+".*",$options:"i"}}
         ]
      })

      res.status(200).json({success:true,message:"data searched by you",data:userData,totalItem:userData.length})
    })
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Search controller error',
        error: error
      })
  }
}

module.exports = { createJob, getAllJobs, updateJob, deleteJob,searchController }
