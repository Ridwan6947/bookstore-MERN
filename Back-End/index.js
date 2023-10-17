import express from "express";
import {PORT , mongoDBURL} from "./config.js"  //port from config.js
import mongoose from 'mongoose'
import { book1 } from "./models/bookmodel.js";


const app = express() //defining a new variable for express

// 2 Parameter (req,res)=> arrow function acts as a callback function and '/' is the route path
app.get('/',(req,res)=>{            //Creating a new route for '/' route . GET is a http method that is used in getting a resource from server
    console.log(req)
    return res.status(234).send(`Welcome`)
    });  

app.use(express.json());    // this will allow us to trigger the api with JSON files

//for saving a book to a server we will require a http route of POST method
//POST is used to create a new resource


app.get(()=>{
    res.send("done");
});

app.post('/books' , async(req,res) =>{
    try{
        if(
            !req.body.Title ||
            !req.body.Author ||
            !req.body.Publisher ||
            !req.body.Price
        ){
            return res.status(400).send({
                message : 'Set all Fields'
            });
        }
        const newBook = {
            Title: req.body.Title,
            Author: req.body.Author,
            Publisher: req.body.Publisher,
            Price: req.body.Price,
        };

        const book = await book1.create(newBook);  //await to create a new book document in a database using Mongoose 
        //newBook is an object that contains the data for the new book you want to create.
        //Book.create(newBook) is a Mongoose method that inserts a new document into the MongoDB collection associated with the Book model. 

        return res.status(200).send(book);
    }catch(error){
        console.log(error.message);               //if a error occures print the error message
        res.status(500).send({message : error.message});
    }
});

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