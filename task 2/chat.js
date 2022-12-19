const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./database/db');
const dotenv=require('dotenv');
dotenv.config();

const userRoutes=require('./routes/user');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(userRoutes);

sequelize.sync()
.then(app.listen(3000));