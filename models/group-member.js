const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const groupMember=sequelize.define('groupMember',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports=groupMember;