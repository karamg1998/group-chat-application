const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const groupMember=sequelize.define('groupMember',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    admin:{
        type:Sequelize.STRING,
        allowNull:false
    },
   groupName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=groupMember;