const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');


const app = express();


dotenv.config({ path: './config.env'});


require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;



// Middelware

// const middleware = (req,res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }


app.get('/',(req , middleware ,res)=>{
    res.send(`Hello world from the server app.js`);
});

app.get('/about',(req,res)=>{
    res.send(`Hello About world from the server`);
});

app.get('/contact',(req,res)=>{
    res.send(`Hello Contact world from the server`);
});

app.get('/signin',(req,res)=>{
    res.send(`Hello Login world from the server`);
});

app.get('/signup',(req,res)=>{
    res.send(`Hello Registration world from the server`);
});

app.listen(PORT,()=>{
    console.log(`server is runnig at port no ${PORT}`);
})