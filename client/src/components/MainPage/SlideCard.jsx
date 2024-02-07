import React, { useEffect, useState } from "react"
import Sdata from "./Sdata"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }

  
  const [Advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const divStyle = {
      borderRadius: '10px', 
     // You can adjust the value to change the level of rounding
    };

  useEffect (() => {
    async function fetchAdvertisement() {
      try {
        const response = await fetch('http://localhost:9000/users/allAdvertisement');
        const data = await response.json();

        if (response.ok) {
          setAdvertisement(data.slice(-10));

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
  const apartmentsForRent = Advertisement.filter((ad) => ad.propertyType === 'land');
  return (
    <>
      <Slider {...settings}>
        {Advertisement.map((value, index) => {
          return (
            <>
              <div className='box d_flex top' key={index}>
                <div className='left'>
                  <h1>{value.description}</h1>
                  <p>{value.desc}</p>
                  <button className='btn-primary'>المزيد</button>
                </div>
                <div className='right' style={{ marginLeft: '20px' , borderRadius:'20px' }}>
                <img src={value.avatar} alt='' style={{ width: '300px', height: '300px',borderRadius:'20px' }} />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard
