const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required']
    },
    workType: {
      type: String,
      // enum: ['full-time', 'part-time', 'internship', 'contract'],
      default: 'full-time'
    },
    workLocation: {
      type: String,
      default: 'Gurgaon',
      required: [true, 'Job location is required']
    },
    salary: {
      type: Number,
      required: [true, 'salary is required']
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required']
    },
    jobDesc: {
      type: String,
      required: [true, 'Job description is required']
    },
    compLinkedin: {
      type: String,
      required: [true, 'Linkedin profile is required']
    },
    compWebsite: {
      type: String,
      required: [true, 'Please provide company website link']
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', jobsSchema)
