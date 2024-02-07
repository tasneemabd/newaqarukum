import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import styled from "styled-components";
import AccountBox from "./components/accountbox"
import Product from "./components/product/Product"
import ContactForm from "./Form/ContactForm"
import MultiStepForm from "./Form/MultiStepForm"
import Categories from "./components/MainPage/Categories"
import ApartmentsForRent from "./components/MainPage/ApartmentsForRent"
import FurnishedApartments from "./components/MainPage/FurnishedApartments"
import WarehousesForRent from "./components/MainPage/WarehousesForRent"
import VillasForRent from "./components/MainPage/VillasForRent"
import FarmsForSale from "./components/MainPage/FarmsForSale"
import VillasForSale from "./components/MainPage/VillasForSale"
import BuildingsForSale from "./components/MainPage/BuildingsForSale"
import ApartmentsForSale from "./components/MainPage/ApartmentsForSale"
import LandsForSale from "./components/MainPage/LandsForSale"
import ShopsForRent from "./components/MainPage/ShopsForRent"
import { AuthProvider, useAuth } from './common/header/AuthProvider'; // Import useAuth hook
import Profile from "./components/accountbox/Profile"

function App() {

  const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
  /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :
  const { productItems } = Data
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)
    // if productExit chai alredy exit in cart then will run fun() => setCartItem
    // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
    // gayara check garxa if item.id ra product.id chai match bhayo bhane
    // productExit product chai display garxa
    // ani increase  exits product QTY by 1
    // if item and product doesnt match then will add new items
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      // but if the product doesnt exit in the cart that mean if card is empty
      // then new product is added in cart  and its qty is initalize to 1
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }


  const { isLoggedIn } = useAuth(); 

  
  return (
    
    <>

    <Router>
      <Route
        render={({ location }) => {
          if (location.pathname === '/account') {
            return null; // Do not render Header for "/account" path
          }

          // Render Header for all other paths
          return <Header CartItem={CartItem} />;
        }}
      />

      <Switch>
      <Route path='/categories' component={Categories} />
        <Route path="/" exact>
          <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
        </Route>
        <Route path="/cart" exact>
          <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
        </Route>
        {/* Render AccountBox only for the "/account" path */}
        <Route path="/" exact>
          <AccountBox />
        </Route>
        <Route path="/pro/:id" exact>
  <Product />
</Route>

       {/* <Route path="/pro/:id" render={(props) => <Product {...props} />} /> */}

        <Route path="/form" exact>
          <ContactForm />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/sub" exact>
          <MultiStepForm />
        </Route>
       
        <Route path="/apartment" exact>
          <ApartmentsForRent />
        </Route>
        <Route path="/FurnishedApartments" exact>
          <FurnishedApartments />
        </Route>
        <Route path="/WarehousesForRent" exact>
          <WarehousesForRent />
        </Route>
        <Route path="/VillasForRent" exact>
          <VillasForRent />
        </Route>
        <Route path="/FarmsForSale" exact>
          <FarmsForSale />
        </Route>
        <Route path="/VillasForSale" exact>
          <VillasForSale />
        </Route>
        <Route path="/BuildingsForSale" exact>
          <BuildingsForSale />
        </Route>
        <Route path="/ApartmentsForSale" exact>
          <ApartmentsForSale />
        </Route>
        <Route path="/LandsForSale" exact>
          <LandsForSale />
        </Route>
     
        <Route path="/ShopsForRent" exact>
          <ShopsForRent />
        </Route>
     
        <Route path="/account" exact>
          <AccountBox />
        </Route>
     
      </Switch>

      <Footer />
    </Router>
 

    {/* <AccountBox /> */}

      {/* <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path='/' exact>
            <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
          </Route>
          <Route path='/cart' exact>
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
          </Route>
        </Switch>
        <Footer />
      </Router> */}


      
    </>
  )
}

export default App
