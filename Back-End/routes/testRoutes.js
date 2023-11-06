const express=require("express");
const testController = require("../controllers/testController");
const router=express.Router();

router.post("/",testController);


module.exports=router;