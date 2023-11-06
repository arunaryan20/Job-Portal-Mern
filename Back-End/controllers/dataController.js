const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const getAllData = async (req, res) => {
  // const data= await userModel.find();
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.send({ result: 'Invalid token' })
    } else {
      res
        .status(200)
        .json({ success: true, message: 'all data', data: authData })
    }
  })
}
const updateData = async (req, res) => {
  var { firstName, lastName, email, location } = req.body

  if (!firstName || !lastName || !email || !location) {
    res.status(400).json({ success: false, message: 'Fill all the fields' })
  } else {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
      if (err) {
        res.send({ result: 'Invalid token' })
      } else {
        const user = await userModel.findOne({ _id: authData.data._id })
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.location = location
        const updated_data = await user.save()

        res.status(200).json({
          success: true,
          message: 'updated successfully',
          data: {
            firstName: updated_data.firstName,
            lastName: updated_data.lastName,
            email: updated_data.email,
            location: updated_data.location
          }
        })
      }
    })
  }
}

module.exports = { getAllData, updateData }
