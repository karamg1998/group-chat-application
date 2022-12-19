const user=require('../models/user');

exports.signup=(req,res,next)=>{
    user.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.pass
    }).then(response=>{
        res.json(response);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
};