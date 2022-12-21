const express=require('express');
const messageController=require('../controller/messages');
const router=express.Router();

router.get('/user/chats',messageController.Allchats);
router.post('/user/achat',messageController.chats);

module.exports=router;