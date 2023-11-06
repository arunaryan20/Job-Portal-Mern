const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"First Name is required"]
    },
    email:{
        type:String,
        require:[true,"Email is require"],
        unique:true,
    },
    phone:{
        type:Number,
        require:[true,"Phone number is require"],
        unique:true,
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
},
{timestamps:true}
);

// userSchema.pre('save',async function(){
//    const salt=await bcrypt.getSalt(10);
//    this.password=await bcrypt.hash(this.password,salt);
// })

module.exports=mongoose.model('User',userSchema);