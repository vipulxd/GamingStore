import {React, useEffect, useState} from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import CartItem from "../components/Cart";
import axios from "axios";
import {useSelector} from "react-redux";

import "../Styles/cart.css";
function Cart() {
  const logged = useSelector(state => state.UserInfo.authenticated);
  const [cartdata, setcartdata] = useState();
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setcartdata(response.data);
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="cartouter">
      <Header />
      {logged ? (
        <CartItem />
      ) : (
        <div
          style={{
            height: "450px",
            display: "flex",
            justifyContent: "space-around",
          }}
          className="_cart_body"
        >
          <div>
            <img src="/static/construct.gif" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
