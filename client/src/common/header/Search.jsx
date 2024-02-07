import React from "react"
import logo from "../../components/assets/images/logo.svg"
import images from "../../components/assets/images/logoo.png"
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthService from "./AuthService ";

const Search = ({ CartItem }) => {
  const history = useHistory();
  const isLoggedIn = AuthService.isLoggedIn();

  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  const handleClick = () => {
    if (isLoggedIn) {
      // User is logged in, go to '/add' route
      history.push("/sub");
    } else {
      // User is not logged in, go to registration route
      history.push("/account");
    }
  };
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
        <Link to="/">
            <div className='logo width '>
              <img src={images} alt='' />
            </div>
          </Link>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input style={{ direction: 'rtl' }} type='text' placeholder='بحث...' />
            <span>كل الفئات</span>
          </div>

          <div className='icon f_flex width'>
          <Link to='/profile'>
            <i className='fa fa-user icon-circle'></i>
            </Link>
            <div className='cart' onClick={handleClick}>
              <i className='fa fa-plus icon-circle'></i>
              <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search


// import React from "react";
// import logo from "../../components/assets/images/logo.svg";
// import images from "../../components/assets/images/logoo.png";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// const Search = ({ CartItem }) => {
//   const history = useHistory();
//   const { isLoggedIn } = useAuth();

//   const handleCartClick = () => {
//     if (isLoggedIn) {
//       // User is logged in, allow to add to cart
//       history.push('/sub');
//     } else {
//       // User is not logged in, redirect to registration
//       history.push('/account');
//     }
//   };

//   // fixed Header
//   window.addEventListener("scroll", function () {
//     const search = document.querySelector(".search");
//     search.classList.toggle("active", window.scrollY > 100);
//   });

//   return (
//     <>
//       <section className='search'>
//         <div className='container c_flex'>
//           <div className='logo width '>
//             <img src={images} alt='' />
//           </div>

//           <div className='search-box f_flex'>
//             <i className='fa fa-search'></i>
//             <input style={{ direction: 'rtl' }} type='text' placeholder='بحث...' />
//             <span>كل الفئات</span>
//           </div>

//           <div className='icon f_flex width'>
//             <Link to='/account'>
//               <i className='fa fa-user icon-circle'></i>
//             </Link>
//             <div className='cart' onClick={handleCartClick}>
//               <i className='fa fa-plus icon-circle'></i>
//               <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Search;
