/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListProduct = () => {
 const [products, setProduct]= useState([]);
      useEffect(()=>{
        getProduct();
      },[]);

      const getProduct = async() =>{
        const response = await axios.get("http://localhost:5000/api/mf/getphoto");
        setProduct(response.data);

      }
  const deletePhoto = async(photoId) =>{
    try {
      await axios.delete(`http://localhost:5000/api/mf/getphoto/${photoId}`)
      //after delete, calling all photo product function without reload the page
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="container mt-5">
      <Link to="/add" className='button is-success'>Add New</Link>
        <div className="columns is-multiline mt-5">
          {//looping 
          products.map((product)=>(
        <div className="column is-one-quarter" key={product.id}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-3by4">
              <img src={product.url} alt="Picture" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{product.name}</p>
              </div>
            </div>
          </div>

          <footer className='card-footer'>
            <Link to={`edit/${product.id}`} className='card-footer-item'>Edit</Link>
            <a onClick={()=> deletePhoto(product.id)} className='card-footer-item'>Delete</a>
          </footer>
        </div>
        
            </div>
          ))}
            
        </div>
    </div>
  )
}

export default ListProduct