const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./database/db');
const dotenv=require('dotenv');
dotenv.config();

const userRoutes=require('./routes/user');
const messgRoutes=require('./routes/messages');
const groupRoutes=require('./routes/group');

const user=require('./models/user');
const messages=require('./models/messages');
const group=require('./models/group');
const groupMember=require('./models/group-member');
const groupMessages=require('./models/group-messages');

const app=express();

app.use(cors({origin:"http://127.0.0.1:5500"}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(messgRoutes);
app.use(groupRoutes);

user.hasMany(messages);
user.hasMany(group);
user.hasMany(groupMember);
group.hasMany(groupMember);
user.hasMany(groupMessages);

sequelize.sync()
.then(app.listen(3000));