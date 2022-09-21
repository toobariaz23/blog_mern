
require('dotenv').config()
const express=require('express');

const app=express();
const cors= require('cors')
const port= process.env.PORT || 3001;

const mongoDB= require('./config/config')
const userRoutes= require('./routes/user')
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',userRoutes)
app.listen(port,()=>{
    console.log("App is running on ",port)
})
mongoDB();
// const mongoose =require('mongoose');

// mongoose.connect('mongodb://localhost/testdb',()=>{

// console.log("DB connected")

// },
// e=>console.log(e)
// )