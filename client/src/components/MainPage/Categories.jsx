import React from "react"
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Categories = () => {
  const history = useHistory();

  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "شقق للايجار",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "أراضي للبيع",
    },
    
    {
      cateImg: "./images/category/cat4.png",
      cateName: "شقق للبيع",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "عمائر للبيع",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "محلات للايجار",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "استراحة للبيع",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "مزرعة للبيع",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "استراحة للايجار",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "مستودع للايجار",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "شقة مفروشة",
    },
  ]
  const handleCategoryClick = (cateName) => {
    if (cateName === "شقق للايجار") {
      history.push("/apartment");
    } else if (cateName === "أراضي للبيع") {
      history.push("/LandsForSale");
    } else if (cateName === "سيارات") {
      history.push("/category/Cars");
    } else if (cateName === "شقق للبيع") {
      history.push("/ApartmentsForSale");
    } else if (cateName === "عمائر للبيع") {
      history.push("/BuildingsForSale");
    } else if (cateName === "محلات للايجار") {
      history.push("/ShopsForRent");
    } else if (cateName === "استراحة للبيع") {
      history.push("/VillasForSale");
    } else if (cateName === "مزرعة للبيع") {
      history.push("/FarmsForSale");
    } else if (cateName === "استراحة للايجار") {
      history.push("/VillasForRent");
    } else if (cateName === "مستودع للايجار") {
      history.push("/WarehousesForRent");
    } else if (cateName === "شقة مفروشة") {
      history.push("/FurnishedApartments");
    } else {
      // Default case: navigate to a generic category route
      history.push(`/category/${cateName}`);
    }
  };
  
  return (
    <>
    <div className="category">
      {data.map((value, index) => (
        <div
          key={index}
          className="box f_flex"
          onClick={() => handleCategoryClick(value.cateName)}
        >
          <img src={value.cateImg} alt="" />
          <span>{value.cateName}</span>
        </div>
      ))}
    </div>
    </>
  )
}

export default Categories
