const jwt = require('jsonwebtoken');
const user = require('../models/user');
const group=require('../models/group');
const groupMember=require('../models/group-member');
const groupMessages=require('../models/group-messages');
const dotenv = require('dotenv');
dotenv.config();

exports.addM=async (req,res,next)=>{
    let id=jwt.verify(req.body.token,process.env.jwt);
   try{
    let name;
    let gid;
    await user.findOne({where:{id:id.userid}}).then(user=>{
          name=user.name;
          return group.findOne({where:{name:req.body.gName}});
    }).then(group=>{
        gid=group.id;
        return groupMessages.create({
            message:req.body.gm,
            userId:id.userid,
            groupId:gid,
            userName:name
        });
    })
    .then(m=>{
        res.json({m:'message sent'});
    })
   }
   catch(err)
   {
    res.json(err);
   }
};

exports.getM=async (req,res,next)=>{
    let id=jwt.verify(req.header('token'),process.env.jwt);
    try{
        let gid;
        await group.findOne({where:{name:req.header('group')}}).then(group=>{
         gid=group.id;
         return groupMessages.findAll({where:{groupId:[gid,['id','ASC']]}});
        }).then(m=>{
            let obj=[];
            for(var i=0;i<m.length;i++)
            {
              if(m[i].userId===id.userid)
              {
                obj.push({message:m[i].message,sender:'logger',name:m[i].userName});
              }
              else{
                obj.push({message:m[i].message,sender:'secondary',name:m[i].userName});
              }
            }
            res.json(obj);
        })
    }
    catch(err)
    {
        res.json(err);
    }
}



