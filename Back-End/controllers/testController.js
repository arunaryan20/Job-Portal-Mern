const testController=(req,res)=>{
    console.log(req.body.firstName)
     res.send("this is test controller");
}

module.exports=testController;