import React, { useEffect, useState } from "react"
import Ndata from "./Ndata"
import "./style.css";
import { Link } from "@mui/material";
const Cart = () => {

  const [Advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const divStyle = {
      borderRadius: '10px', 
     // You can adjust the value to change the level of rounding
    };

  useEffect(() => {
    async function fetchAdvertisement() {
      try {
        const response = await fetch('http://localhost:9000/users/allAdvertisement');
        const data = await response.json();

        if (response.ok) {
          setAdvertisement(data);
        } else {
          setError(error);
        }
      } catch (error) {
        console.log(  error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvertisement();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const apartmentsForRent = Advertisement.filter((ad) => ad.propertyType === 'land1');

  return (
    
    <>
  
         {/* {Ndata.map((val, index) => {
          return (
            <div className='box' key={index}>
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}</span>
            </div>
          )
        })}  */}


    



{apartmentsForRent.map((ad, index) => (
        <div key={index} className="blog-card">
        <div className="meta">
          <div
            className="photo"
            style={{
              backgroundImage:
                `url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)`,
            }}
          ></div>
          <ul className="details">
            <li className="author">
              <a href="#">تسنيم</a>
            </li>
            <li className="date">التاريخ</li>
            <li className="tags">
              <ul>
                <li>
                  <a href="#">خيار1</a>
                </li>
                <li>
                  <a href="#">خيار2</a>
                </li>
                <li>
                  <a href="#">خيار3</a>
                </li>
                <li>
                  <a href="#">خيار4</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="description" >
          <h1>شقة مفروشة للحجز في شارع المنهل اللطيف ، حي السلامة ، جدة ، جدة</h1>
          <h2>Opening a door to the future</h2>
          <p>
          شقة مفروشة للحجز في شارع المنهل اللطيف ، حي السلامة ، جدة ، جدة
          </p>
          <p className="read-more" >
            <Link to="/pro" > المزيد</Link>
          </p>
        </div>
      </div>
       ))}
    
 
    </>
  )
}


export default Cart
