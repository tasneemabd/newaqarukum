import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Wrapper = () => {
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
        console.log(error);
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
  const apartmentsForRent = Advertisement.filter((ad) => ad.propertyType === 'WarehousesForRent');

  return (
    <>
      <section className='wrapper background'>
        <div className='containerss grid2'>
          {Advertisement.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <img src={val.avatar} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: "50px" }} />
                </div>
                <h3>
                  {val.propertyType === 'land' ? 'أرض للبيع' :
                    val.propertyType === 'BuildingsForSale' ? 'عمارة للبيع' :
                      val.propertyType === 'ShopsForRent' ? ' محل للايجار' :
                        val.propertyType === 'FurnishedApartments' ? '  شقة مفروشة ' :
                          val.propertyType === 'VillasForRent' ? '  استراحة للايجار' :
                            val.propertyType === 'FarmsForSale' ? '   مزرعة للبيع' :
                              val.propertyType === 'WarehousesForRent' ? '  مستودع للبيع ' :
                                val.propertyType === 'apartment' ? ' شقة للايجار ' :
                                  val.propertyType}
                </h3>
                <p>{val.description}</p>
                <div className="button-div">
                  <Link to={`/pro/${val._id}`} state={{ val }}>
                    <button className="btn-primary">عرض التفاصيل</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Wrapper;
