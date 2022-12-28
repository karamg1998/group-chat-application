const user=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

exports.signup=(req,res,next)=>{
    if(req.body.name==='' && req.body.email=='' && req.body.pass=='')
    {
      throw new Error('all the fields are mendatory');
    }
      let saltRounds=10;
      bcrypt.hash(req.body.pass,saltRounds,async(err,hash)=>{
        if(!err)
        {
        try{
         await user.create({
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          password:hash,
           }).then(user=>{
          res.json({success:true,message:"user singned up"});
          console.log('user signed up');
           });  
        }
        catch(err)
        {
          res.status(500).json(err);
          console.log('error in creating user');
        }
        }
        else{
            console.log(err);
        } 
      })
};

function jwtgenerate(id)
{
  return  jwt.sign({userid:id},process.env.jwt);
}

exports.login=async (req,res,next)=>{
  try{
    user.findOne({where:{phone:req.body.phone}})
    .then(user=>{
        if(!user)
        {
             res.status(404).json({success:false,message:'user does not exist'});
        }
        else{
            bcrypt.compare(req.body.pass,user.password,(err,response)=>{
               if(response===true)
               {
                   res.status(200).json({success:true,token:jwtgenerate(user.id)})
               }
               else{
                res.status(401).json({success:false,message:'user not authorized'});
               }
            })
        }
    })
  }
  catch(err)
  {
    res.status(500).json(err);
  }
};

