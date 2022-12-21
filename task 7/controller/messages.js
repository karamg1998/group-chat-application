const message=require('../models/messages');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

exports.Allchats=async (req,res,next)=>{
let header=req.header('token');  
let id = jwt.verify(header,process.env.jwt);
try{
  await message.findAll({where:{userId:id.userid}})
.then(chats=>{
   let obj=[];
   for(var i=0;i<chats.length;i++)
   {
      obj.push({message:chats[i].message});
   }
   res.status(200).json(obj);
})
}
catch(err)
{
   res.status(500).json(err);
}

};

exports.chats=async (req,res,next)=>{
   let id = jwt.verify(req.body.token,process.env.jwt);
   try{
       message.create({
           message:req.body.message,
           userId:id.userid
      }).then(response=>{
         res.json({success:true,message:'sent'});
      })
   }
   catch(err)
   {
      res.status(500).json(err);
   }
 
};