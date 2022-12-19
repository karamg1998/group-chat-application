const user=require('../models/user');

exports.signup=(req,res,next)=>{
    user.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.pass
    }).then(response=>{
        res.json({name:response.name,
            email:response.email,
            phone:response.phone});
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
};