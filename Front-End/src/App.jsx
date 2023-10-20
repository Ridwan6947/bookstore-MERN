import React from 'react'
import {Routes,Route} from 'react-router-dom'
import home from './pages/home.jsx';
import createBook from './pages/createBook.jsx';
import deleteBook from './pages/deleteBook.jsx';
import fetchBook from './pages/fetchBook.jsx';
import updateBook from './pages/updateBook.jsx';

const BookStore = () => {
  return (
    // <div className="bg-red-500 font-bold text-center" style={{ padding: '1.2rem', fontSize: '1.7rem', fontFamily: 'NewFont' }}>BookStore</div>
    <Routes>
      <Route path='/' element={home}/>
      <Route path='/books/create' element={createBook}/>
      <Route path='/books/delete/:id' element={deleteBook}/>
      <Route path='/books/update/:id' element={updateBook}/>
      <Route path='/books/detail/:id' element={fetchBook}/>
    </Routes>

  )
}

export default BookStore