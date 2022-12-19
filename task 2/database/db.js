const Sequelize=require('sequelize');
const dotenv=require('dotenv');
dotenv.config();

const sequelize=new Sequelize(process.env.dbschema,process.env.dbuser,process.env.dbpassword,{
    dialect:process.env.dbdialect,
    host:process.env.dbhost
});

module.exports=sequelize;