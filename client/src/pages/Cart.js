import React from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import "../Styles/cart.css";
function Cart() {
  return (
    <div>
      <Header />
      <div className="_cart_body">THis is your cart</div>
      <Footer />
    </div>
  );
}

export default Cart;
