import express from "express";
import {PORT , mongoDBURL} from "./config.js"  //port from config.js
import mongoose, { get } from 'mongoose'
import cors from 'cors';
import bookRoute from './routes/bookRoute.js'

const app = express() //defining a new variable for express

//MiddelWare to handel CORS (cross origin resource sharing - restrict the abilty of a webpage to make request to a website of another domain)
app.use(cors());
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET' , 'POST' , 'DELETE' , 'PUT'],
//         allowedHeaders:['Content-Type']
//     })
// );

// 2 Parameter (req,res)=> arrow function acts as a callback function and '/' is the route path
app.get('/', async (req,res)=>{            //Creating a new route for '/' route . GET is a http method that is used in getting a resource from server
    console.log(req)
    return res.status(234).send(`Welcome`)
    });  

app.use(express.json());    // this will allow us to trigger the api with JSON files

//for saving a book to a server we will require a http route of POST method
//POST is used to create a new resource


app.use('/books' , bookRoute);


mongoose                     
   .connect(mongoDBURL)              //connect the mongoDB datebase to the server
   .then(()=>{                      //try block for success & catch block for failure
        console.log('App connect to database') 
        app.listen(PORT, ()=>{            //to listen the port we have to create app listner
            console.log(`App is running : ${PORT}`)       //made a callback function to listen to the port
        });            
    })
    .catch((error) => {
      console.error('Error:', error);
    });