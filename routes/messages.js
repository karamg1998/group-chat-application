const express=require('express');
const messageController=require('../controller/messages');
const router=express.Router();

router.get('/users',messageController.AllUser);
router.get('/user/chats',messageController.Chats);
router.get('/chats',messageController.returnChats);
router.post('/user/addchat',messageController.addChat);


module.exports=router;