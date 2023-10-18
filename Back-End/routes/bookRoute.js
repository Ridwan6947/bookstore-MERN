import express, { Router } from 'express';
import { book1 } from '../models/bookmodel.js';

const route = express.Router() 




route.post('/', async (req, res) => {            // "/books" is the endpoint for which we are setting http route
    try {
        if (
            !req.body.Title ||
            !req.body.Author ||
            !req.body.Publisher ||
            !req.body.Price
        ) {
            return res.status(400).send({
                message: 'Set all Fields'
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
    } catch (error) {
        console.log(error.message);               //if a error occures print the error message
        res.status(500).send({ message: error.message });
    }
});

// Route to get book from database on the basis of its ID
route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await book1.findById(id);
        return res.status(200).json(book);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

});

//Route to get book from database in the basis of the Name
// route.get('/books/:Title' , async(req,res) =>{
//     try{    
//         const { Title } = req.params;
//         const book = await book1.findByTitle(Title);
//         return res.status(200).json(book);

//     }catch(error){
//         res.status(500).send({message : error.message});
//     }

// });

// Route to get all the books from the DataBase

route.get('/', async (req, res) => {
    try {
        const books = await book1.find({})                //sending empty list to the Http route of books to  get the names of all the books in the database server
        return res.status(200).json({
            count: books.length,
            data: books
        })    //returns list in the form of JSON
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//PUT route is used update a data in the database
route.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.Title ||
            !req.body.Author ||
            !req.body.Publisher ||
            !req.body.Price
        ) {
            return res.status(400).send({
                message: 'Send all required Fields',
            });
        }

        const { id } = req.params;

        const result = await book1.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book Updated successfully' })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });
    }
});

// made a new HTTP route .delete to delete the record of a book from the database
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await book1.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book Deleted Successfully' })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message }); 1
    }

});


export default route;