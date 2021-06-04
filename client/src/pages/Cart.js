import {React, useEffect, useState} from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import ItemCart from "../components/Cart/Cart";
import axios from "axios";
import "../Styles/cart.css";
function Cart() {
  const is_user_logged = localStorage.getItem("_email");
  const [cartdata, setcartdata] = useState();
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setcartdata(response.data);
        console.log(response);
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="cartouter">
      <Header />
      {is_user_logged ? (
        <ItemCart />
      ) : (
        <div className="_cart_body">
          <p>plz log in</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
