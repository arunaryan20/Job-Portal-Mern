const mongoose=require("mongoose");

const dbConnect=async ()=>{
     try{
            const conn=await mongoose.connect(process.env.MONGO_URL);
            console.log("connected to database");
     }catch(error){
        console.log("database error----->",error)
     }
}

module.exports=dbConnect;