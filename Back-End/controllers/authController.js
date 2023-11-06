const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    var { name, email,phone, password } = req.body
    if(!name || !email || !phone || !password){
      res
      .status(400)
      .json({ success: false, message: 'All the fields are required' })
    }
    const emailExist = await userModel.findOne({ email: email })
    if (emailExist) {
      res
        .status(200)
        .json({ success: true, message: 'This email is already exist' })
    } else {
      try {
      
        bcrypt.genSalt(10, async function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              res.status(401).json('Password error')
            } else {
              password = hash
             const user = await userModel.create({
                name,
                email,
                phone,
                password
              })
              res.status(201).json({
                success: true,
                message: 'User created successfully',
                userData:user
              })
            }
          })
        })
      } catch (error) {
        console.log('error------>', error)
      }
    }
  } catch (error) {
    // next(error)
    res.status(400).json({
      message: 'register controller not working',
      error: error
    })
  }
}

const loginController=async(req,res)=>{
      try{
        console.log(req.body.email+" ",req.body.password)
            const data=await userModel.findOne({email:req.body.email});
            if(data){
                const isMatch=await bcrypt.compare(req.body.password,data.password);
              if(isMatch){
                jwt.sign({data},"secretkey",{expiresIn:'1d'}, function(err, token) {
                     if(err){
                      res.status(200).json({success:true,message:"login token generating error",error:err})
                     }else{
                      res.status(200).json({success:true,message:"login successfull",token:token,data:data})
                     }
                });
              }else{
                res.status(200).json({success:true,message:"passoword is not matching"})
              }
            }else{
              res.status(200).json({success:true,message:"User does not exit"})
            }       
                
      }catch(err){
        res.status(404).json({
          success:false,
          message:"Login Controller error",
        })
      }
}


const allUserController=async(req,res)=>{
  try{
  
       const users=await userModel.find()
       res.status(200).json({success:true,message:"this is all usres",user:users})

  }catch(err){
    res.status(404).json({
      success:false,
      message:"All user Controller error",
    })
  }
}

const changePasswordController=async(req,res)=>{
           try{
                       const {oldPass,newPass}=req.body
                       jwt.verify(req.token,"secretkey",async(err,authData)=>{
                               if(err){
                                res.status(400).json({success:false,message:"token verification error",error:err})
                               }else{
                                      const user=await userModel.findOne({_id:authData.data._id})
                                      const isMatch=await bcrypt.compare(oldPass,user.password);
                                      if(isMatch){
                                        bcrypt.genSalt(10, function(err, salt) {
                                          bcrypt.hash(newPass, salt,async function(err, hash) {
                                                if(err){
                                                  res.status(400).json({success:false,message:"password encryption faliled"})
                                                }else{
                                                    user.password=hash
                                                    await user.save()
                                                    res.status(200).json({success:true,message:"password change successfully"})
                                                }
                                          });
                                      });     


                                      }else{
                                         res.status(200).json({success:false,message:"old password not matching"})
                                      }
                               }
                       })
           }catch(err){
            res.status(404).json({
              success:false,
              message:"change password Controller error",
            })
           }
}


module.exports = {registerController,loginController,allUserController,changePasswordController}
