import React , {useEffect , useState} from 'react'; //useEffect, and useState. These are essential for building a React component.
import axios from 'axios'; // commonly used for making HTTP requests, like fetching data from a server.
import  spinner  from '../components/spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react/icons/bs'
import {MdOutlineAddBox  , MdOutlineDelete } from 'react-icons/md';

const home = () => {
  const[books,setBooks] = useState([]);
  const[loading,setLoading] = useStateState(false);
  useEffect(() =>{
    setLoading(true);
    axios
      .get('http://localhost:8080/books')  //sends an HTTP GET request to the specified URL using Axios.
      .then((response) =>{               //if successfull
        setBooks(response.data.data);    // it updates the books state with the response data and sets loading back to false.
        setLoading(false);

      })
      .catch((error) =>{
        console.log(error);     // error during the request, it logs the error and sets loading to false.
        setLoading(false);
      });
  
  },[]);
  return (
    <div>home</div>
  )
}

export default home