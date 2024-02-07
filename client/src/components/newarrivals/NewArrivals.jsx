import React from "react"
import Cart from "./Cart"
import "./style.css"
import Wrapper from "../wrapper/Wrapper"

const NewArrivals = () => {
  return (
    <>


    
      <section className='NewArrivals background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' />
              <h2>عقارات  </h2>
            </div>
           
          </div>

          <Wrapper/>
        </div>
      </section>
    </>
  )
}

export default NewArrivals
