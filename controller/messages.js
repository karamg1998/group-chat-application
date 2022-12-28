const message = require('../models/messages');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function jwtgenerate(id) {
   return jwt.sign({ userid: id }, process.env.jwt);
}

exports.AllUser = async (req, res, next) => {
   let header = req.header('token');
   let id = jwt.verify(header, process.env.jwt);
   let mUser;
   try {
      await user.findOne({ where: { id: id.userid } }).then(logger => {
         mUser = logger.name;
         return user.findAll();
      }).then(users => {
         let obj = [];
         for (var i = 0; i < users.length; i++) {
            if (mUser === users[i].name) {
               continue;
            }
            else {
               obj.push({ name: users[i].name });
            }
         }
         res.json({ obj: obj, logger: mUser });
      })
   }
   catch (err) {
      res.json(err);
   }
};

exports.Chats = (req, res, next) => {
   let id = req.header('token');
   let secondaryUser = req.header('secondUser');
   user.findOne({ where: { name: secondaryUser } }).then(user => {
      res.json({ l: id, s: jwtgenerate(user.id) });
   })
};

exports.addChat = async (req, res, next) => {
   let logger = jwt.verify(req.body.lo, process.env.jwt);
   let sUser = jwt.verify(req.body.su, process.env.jwt);
   try {
      await message.create({
         message: req.body.mssg,
         to: sUser.userid,
         userId: logger.userid
      }).then(message => {
         res.json({success:true,message:'added'});
      })
   }
   catch (err) {
      res.json(err);
   }
};

exports.returnChats = async (req, res, next) => {
   let logger = jwt.verify(req.header('logger'), process.env.jwt);
   let secondaryUser = jwt.verify(req.header('secondary'), process.env.jwt);
  
   try {
      await message.findAll({ where: {userId:[secondaryUser.userid,logger.userid,['id','ASC']],to:[secondaryUser.userid,logger.userid]}})
         .then(response => {
           let obj=[];
           for(var i=0;i<response.length;i++)
           {
            if(response[i].userId===logger.userid)
            {
               obj.push({message:response[i].message,sender:'logger'});
            }
            else{
               obj.push({message:response[i].message,sender:'secondary'});
            }
           }
           res.json(obj);
         })
   }
   catch (err) {
      res.json(err);
   }
};















