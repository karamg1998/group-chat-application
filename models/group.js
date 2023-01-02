const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const group=sequelize.define('group',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=group;