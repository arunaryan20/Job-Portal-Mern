const express=require("express");
const verify = require("../middlewares/authMiddleware");
const dataHandler = require("../controllers/dataController");
const data_router=express.Router();
 
data_router.get("/alldata",verify,dataHandler.getAllData);
data_router.put("/update",verify,dataHandler.updateData);

module.exports=data_router;

