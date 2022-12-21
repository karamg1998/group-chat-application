const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const message=sequelize.define('message',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },message:{
        type:Sequelize.STRING
    }
});

module.exports=message;