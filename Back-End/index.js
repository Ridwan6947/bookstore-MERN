import express, { response } from "express";
import {PORT , mongoDBURL} from "./config.js"  //port from config.js
import mongoose from 'mongoose'


const app = express() //defining a new variable for express

// 2 Parameter (req,res)=> arrow function acts as a callback function and '/' is the route path
app.get('/',(req,res)=>{            //Creating a new route for '/' route . GET is a http method that is used in getting a resource from server
    console.log(req)
    return res.status(234).send(`Welcome`)
});


app.listen(PORT, ()=>{            //to listen the port we have to create app listner
    console.log(`App is running : ${PORT}`)       //made a callback function to listen to the port
});

mongoose                     
   .connect(mongoDBURL)              //connect the mongoDB datebase to the server
   .then(()=>{                      //try block for success & catch block for failure
                       
   })
   .catch(() =>{


   });