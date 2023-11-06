const express=require("express")
const profile_router=express.Router()
const profileCont=require("../controllers/profileController")
const verify=require("../middlewares/authMiddleware")

profile_router.patch("/update-profile",verify,profileCont.updateProfile)
profile_router.get("/my-profile",verify,profileCont.getProfile)

module.exports=profile_router