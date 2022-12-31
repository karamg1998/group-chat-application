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
    try{
        await group.create({
            name:req.body.gName,
            admin:id.userid,
            userId:id.userid
        }).then(resp=>{
            groupId=resp.id;
            groupMember.create({
                userId:id.userid,
                groupId:groupId
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
            g.push(gm[i].groupId);
        }
        return group.findAll({where:{id:g}});
       }).then(re=>{
       let obj=[];
       for(var i=0;i<re.length;i++)
       {
        if(re[i].admin==id.userid)
        {
            obj.push({name:re[i].name,admin:'true'});
        }
        else{
            obj.push({name:re[i].name,admin:'false'});
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

exports.AddP=async (req,res,next)=>{
    try{
        let uid;
        let gid;
        await user.findOne({where:{phone:req.body.par}}).then(user=>{
            if(!user)
            {
                res.json({message:'no user found'});
            }
            else{
                uid=user.id;
            }
            return group.findOne({where:{name:req.body.gName}});
        }).then(group=>{
            gid=group.id;
            return groupMember.findOne({where:{userId:uid,groupId:gid}});
        }).then(resp=>{
            if(!resp)
            {
            groupMember.create({
                userId:uid,
                groupId:gid
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
    console.log(req.header('token'));
    console.log(req.header('group'));
  try{
    let o=[];
    let id;
    let admin;
    await group.findOne({where:{name:req.header('group')}}).then(group=>{
         id=group.id;
         admin=group.admin;
         return groupMember.findAll({where:{groupId:id}});
    }).then(resp=>{
        for(var i=0;i<resp.length;i++)
        {
            o.push(resp[i].userId);
        }
        return user.findAll({where:{id:o}});
    }).then(g=>{
        let obj=[];
        for(var i=0;i<g.length;i++)
        {
          if(g[i].id==admin)
          {
            obj.push({name:g[i].name,admin:'true',id:jwtgenerate(g[i].id)})
          }
          else{
            obj.push({name:g[i].name,admin:'false',id:jwtgenerate(g[i].id)})
          }
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
    await group.findOne({whre:{name:req.header('group')}}).then(group=>{
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
   let name=n[0].toLowerCase()+n.slice(1);
   try{
    let gid;
    await group.findOne({where:{name:name}}).then(g=>{
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
}