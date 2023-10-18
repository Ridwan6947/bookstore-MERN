import express from "express";
import {PORT , mongoDBURL} from "./config.js"  //port from config.js
import mongoose from 'mongoose'
import { book1 } from "./models/bookmodel.js";


const app = express() //defining a new variable for express

// 2 Parameter (req,res)=> arrow function acts as a callback function and '/' is the route path
app.get('/', async (req,res)=>{            //Creating a new route for '/' route . GET is a http method that is used in getting a resource from server
    console.log(req)
    return res.status(234).send(`Welcome`)
    });  

app.use(express.json());    // this will allow us to trigger the api with JSON files

//for saving a book to a server we will require a http route of POST method
//POST is used to create a new resource


app.post('/books' , async(req,res) =>{            // "/books" is the endpoint for which we are settinf http route
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

// Route to get book from database on the basis of its ID
app.get('/books/:id' , async(req,res) =>{
    try{
        const { id } = req.params;
        const book = await book1.findById(id);
        return res.status(200).json(book);

    }catch(error){
        res.status(500).send({message : error.message});
    }

});

//Route to get book from database in the basis of the Name
// app.get('/books/:Title' , async(req,res) =>{
//     try{    
//         const { Title } = req.params;
//         const book = await book1.findByTitle(Title);
//         return res.status(200).json(book);

//     }catch(error){
//         res.status(500).send({message : error.message});
//     }

// });

// Route to get all the books from the DataBase

app.get('/books' , async(req,res) =>{
    try{
        const books = await book1.find({})                //sending empty list to the Http route of books to  get the names of all the books in the database server
        return res.status(200).json({
            count: books.length,
            data: books
        })    //returns list in the form of JSON
    }catch(error){
        res.status(500).send({message : error.message});
    }
});

//PUT route is used update a data in the database
app.put('/books/:id',async(req,res) =>{
    try{
        if(
            !req.body.Title ||
            !req.body.Author ||
            !req.body.Publisher ||
            !req.body.Price
        ){
            return res.status(400).send({
                message : 'Send all required Fields',
            });
        }

        const { id } = req.params;

        const result = await book1.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message : 'Book not found'});
        }
        return res.status(200).send({message : 'Book Updated successfully'})
        
    }catch(error){
        console.log(error.message)
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