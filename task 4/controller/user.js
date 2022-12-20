const user=require('../models/user');

exports.signup=async (req,res,next)=>{
    try{
        await user.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.pass
       }).then(response=>{
        res.json({success:true,message:'User signed up successfully'});
        })
    }
    catch(err){
        res.status(500).json(err);
    }
    
};

