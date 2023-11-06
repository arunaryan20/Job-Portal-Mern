const express=require("express");
const jobsRoute=express.Router();
const job_data= require("../controllers/jobController");
const verify=require("../middlewares/authMiddleware")

jobsRoute.post("/create-job",verify,job_data.createJob);
jobsRoute.get("/all-jobs",verify,job_data.getAllJobs);
jobsRoute.patch("/update-job/:id",verify,job_data.updateJob);
jobsRoute.delete("/delete-job/:id",verify,job_data.deleteJob);
jobsRoute.get("/my-data/",verify,job_data.searchController)


module.exports=jobsRoute;