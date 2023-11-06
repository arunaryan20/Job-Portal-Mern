const express=require("express");
const app=express();
const cors=require("cors");

const dotenv=require("dotenv");
dotenv.config();

const dbConnect = require("./config/db");
dbConnect();
app.use(express.json());
const router = require("./routes/testRoutes");
const auth_router=require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const data_router = require("./routes/dataRoutes");
const jobsRoute = require("./routes/jobsRoute");
const profile_Route=require("./routes/profileRoutes")

const PORT=process.env.PORT;

app.use(cors());
//atlas password
// 4cagp7vByJ9JqaNr

app.use("/auth",auth_router)
app.use("/data",data_router)
app.use("/job",jobsRoute);
app.use("/profile",profile_Route)
//app.use("/",router)

//validation middleware
// app.use(errorMiddleware)

app.listen(PORT);