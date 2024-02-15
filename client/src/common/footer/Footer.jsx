import React from "react"
import "./style.css"
import images from "../../components/assets/images/2d5ae58f-623a-482c-9d43-9c97e3fad691.jpeg"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1 style={{ direction: 'rtl' }}>عقاركم</h1>
            {/* <img src={images} style={{ width: '300px',height:'200px'  }}/> */}
            <br/>
            <br/>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i class='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i class='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box' style={{ direction: 'rtl' }}>
            <h2>من نحن</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='box' style={{ direction: 'rtl' }}>
            <h2> </h2>
            <ul>
              {/* <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li> */}
            </ul>
          </div>
          <div className='box' style={{ direction: 'rtl' }}>
            <h2> تواصل معنا</h2>
            <ul>
              <li>   :البريدالكتروني </li>
              <li>هاتف: +1 1123 456 780</li>
              <li>       <a href='https://twitter.com/aqarukum57525' target='_blank' rel='noopener noreferrer' style={{ color: "#FFF" }}>
                إكس
              </a></li>

            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
