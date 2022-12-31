const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const groupMessage=sequelize.define('group-message',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message:{
        type:Sequelize.STRING
    },
    userName:{
        type:Sequelize.STRING
    },
    groupId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports=groupMessage;