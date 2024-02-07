import React from "react"
import images from "../../components/assets/images/s1.jpeg"
const Head = () => {
  return (
    <>
      <section className='head'>
  <div className='container d_flex'>
    <div className='left row d_flex'> 
      <i className='fa fa-envelope d_flex'></i>
      <a href='https://twitter.com/aqarukum57525' target='_blank' rel='noopener noreferrer' style={{ color: "#FFF"  }}>
  Twitter
</a>

    </div>
    <div className='left row RText' style={{ justifyContent: 'flex-end' }}>
      {/* <img src={images} style={{ width: '300px',height:'90px'  }}/> */}
    </div>
  </div>
</section>

    </>
  )
}

export default Head
