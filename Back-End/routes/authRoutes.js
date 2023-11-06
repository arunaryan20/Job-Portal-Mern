const express=require("express");
const authController = require("../controllers/authController");
const auth_router=express.Router();
const verify=require("../middlewares/authMiddleware")

auth_router.post("/register",authController.registerController);
auth_router.post("/login",authController.loginController)
auth_router.get("/all-user",authController.allUserController)
auth_router.post("/change-password",verify,authController.changePasswordController)

module.exports=auth_router;