const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const updateProfile=async(req,res)=>{
          try{
               const {name,email,phone}=req.body
               if(!name || !email || !phone){
                res.status(400).json({success:false,message:"All the fields are required"})
               }
              jwt.verify(req.token,"secretkey",async(err,authData)=>{
                    if(err){
                        res.status(400).json({success:false,message:"token verification error"})
                    }else{
                        const userData=await userModel.findOne({_id:authData.data._id})
                        userData.name=name
                        userData.email=email
                        userData.phone=phone
                        await userData.save()
                        res.status(200).json({success:true,message:"data updated succefully"})
                    }
              })

          }catch(err){
               res.status(400).json({success:false,message:"update profile controller error",error:err})
          }
}

const getProfile=async(req,res)=>{
             try{
                       jwt.verify(req.token,"secretkey",async(err,authData)=>{
                        if(err){
                            res.status(400).json({success:false,message:"token verification error"})
                        }else{
                             const userData=await userModel.find({_id:authData.data._id})
                             res.status(200).json({success:true,message:"Your profile",data:userData})
                        }
                       })
             }catch(err){
                res.status(400).json({success:false,message:"get profile controller error",error:err})
             }
}



module.exports={updateProfile,getProfile}