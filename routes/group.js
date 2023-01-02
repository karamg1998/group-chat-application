const express=require('express');
const groupController=require('../controller/group');
const groupMessageController=require('../controller/group-message');
const router=express.Router();

router.post('/create/group',groupController.createGroup);
router.get('/get/groups',groupController.getAG);
router.post('/group/addp',groupController.AddP);
router.post('/group/addM',groupMessageController.addM);
router.get('/group/getM',groupMessageController.getM);
router.get('/group/memN',groupController.getAllm);
router.get('/group/member',groupController.del);
router.get('/group/leave',groupController.leave);
router.get('/group/admin',groupController.Admin);
router.get('/group/Radmin',groupController.remAdmin);
router.delete('/group/del/:name',groupController.delG);


module.exports=router;