const jwt = require('jsonwebtoken');
const user = require('../models/user');
const group=require('../models/group');
const groupMember=require('../models/group-member');
const dotenv = require('dotenv');
const groupMessage = require('../models/group-messages');
dotenv.config();

function jwtgenerate(id) {
    return jwt.sign({ userid: id }, process.env.jwt);
 }

 exports.createGroup=async (req,res,next)=>{
    let id=jwt.verify(req.body.token,process.env.jwt);
    let groupId;
    let name;
    try{
        await group.create({
            name:req.body.gName,
            userId:id.userid
        }).then(resp=>{
            groupId=resp.id;
            return user.findOne({where:{id:id.userid}});
        }).then(user=>{
            name=user.name;
        return  groupMember.create({
                userId:id.userid,
                groupId:groupId,
                admin:'true(su)',
                groupName:req.body.gName,
                userName:name
            }).then(reso=>{
              res.json({message:'success'});
            })
        })
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.getAG=async (req,res,next)=>{
   let id=jwt.verify(req.header('token'),process.env.jwt);
   try{
       await groupMember.findAll({where:{userId:id.userid}}).then(gm=>{
        let g=[];
        for(var i=0;i<gm.length;i++)
        {
            g.push({name:gm[i].groupName,admin:gm[i].admin});
        }
        res.json(g);
       })
   }
   catch(err)
   {
    res.json(err);
   }
}

exports.AddP=async (req,res,next)=>{
    let gn=req.body.gName;
    try{
        let uid;
        let uname;
        let gid;
        await user.findOne({where:{phone:req.body.par}}).then(user=>{
            if(!user)
            {
                res.json({message:'no user found'});
            }
            else{
                uid=user.id;
                uname=user.name;
            }
            return group.findOne({where:{name:gn}});
        }).then(group=>{
            gid=group.id;
            return groupMember.findOne({where:{userId:uid,groupId:gid}});
        }).then(resp=>{
            if(!resp)
            {
            groupMember.create({
                userId:uid,
                groupId:gid,
                admin:'false',
                groupName:gn,
                userName:uname
               }).then(gm=>{
                res.json({message:'user added to the group'});
            })
            }
            else{
                res.json({message:'user already present in the group'});
            }
        })
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.getAllm=async (req,res,next)=>{
  try{
    let id;
    await group.findOne({where:{name:req.header('group')}}).then(group=>{
         id=group.id;
         return groupMember.findAll({where:{groupId:id}});
    }).then(resp=>{
        let obj=[];
        for(var i=0;i<resp.length;i++)
        {
            obj.push({name:resp[i].userName,admin:resp[i].admin,id:jwtgenerate(resp[i].userId)});
        }
       res.json(obj);
    })
  }
  catch(err)
  {
    res.json(err);
  }
};

exports.del=async (req,res,next)=>{
  let id=jwt.verify(req.header('id'),process.env.jwt);
  let gid;
  try{
    await group.findOne({where:{name:req.header('group')}}).then(group=>{
          gid=group.id;
          return groupMember.findOne({where:{userId:id.userid,groupId:gid}});
    }).then(g=>{
        g.destroy();
        res.json({message:'user removed from group'});
    })
  }
  catch(err)
  {
    res.json(err);
  }
}

exports.delG=async (req,res,next)=>{
   let n=req.params.name;
   try{
    let gid;
    await group.findOne({where:{name:n}}).then(g=>{
        gid=g.id;
        return groupMember.findAll({where:{groupId:gid}});
    }).then(gi=>{
        for(var i=0;i<gi.length;i++)
        {
            gi[i].destroy();
        }
        return groupMessage.findAll({where:{groupId:gid}});
    }).then(g=>{
        for(var i=0;i<g.length;i++)
        {
            g[i].destroy();
        }
        return group.findOne({where:{id:gid}});
    }).then(gr=>{
        gr.destroy();
        res.json({message:'group deleted'});
    })
   }
   catch(err)
   {
    res.json(err);
   }
};

exports.leave=async(req,res,next)=>{
  let id=jwt.verify(req.header('token'),process.env.jwt);

  try{
    await groupMember.findOne({where:{userId:id.userid,groupName:req.header('group')}})
    .then(group=>{
        group.destroy();
        res.json({message:'leaved'});
    })
  }
  catch(err)
  {
    res.json(err);
  }
};

exports.Admin=async (req,res,next)=>{
  let id=jwt.verify(req.header('id'),process.env.jwt);
  let token=jwt.verify(req.header('token'),process.env.jwt);
  let groupName=req.header('group');
  try{
    await groupMember.findOne({where:{userId:token.userid,groupName:groupName}}).then(gM=>{
        if(gM.admin=='true'||'true(su)')
        {
            return groupMember.findOne({where:{userId:id.userid,groupName:groupName}});
        }
        else{
            res.status(401).json({message:'user not authorised'});
        }
    }).then(member=>{
      member.update({admin:'true'});
      res.json({message:'user is now admin',success:'true',name:member.userName,id:jwtgenerate(member.userId)});
    })
  }
  catch(err)
  {
    res.json(err);
  }
};

exports.remAdmin=async (req,res,next)=>
{
    let id=jwt.verify(req.header('id'),process.env.jwt);
    let token=jwt.verify(req.header('token'),process.env.jwt);
    let groupName=req.header('group');
    try{
        await groupMember.findOne({where:{userId:token.userid,groupName:groupName}}).then(gM=>{
            if(gM.admin=='true'||'true(su)')
            {
                return groupMember.findOne({where:{userId:id.userid,groupName:groupName}});
            }
            else{
                res.status(401).json({message:'user not authorised'});
            }
        }).then(member=>{
          member.update({admin:'false'});
          res.json({success:'true',name:member.userName,id:jwtgenerate(member.userId)});
        })
      }
      catch(err)
      {
        res.json(err);
      }
}