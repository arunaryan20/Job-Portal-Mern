function verify(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=="undefined"){
        const token=bearerHeader.split(' ')[1];
        req.token=token;
        next();
    }else{
        res.status(400).json({success:false,message:"token is not valid"})
    }
}

module.exports=verify;