import {React, useState} from "react";
import Header from "../components/Header";
import "../Styles/payment.css";
import axios from "axios";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import emailjs from "emailjs-com";
function Payment() {
  const [details, setdetails] = useState({
    user_name: "",
    address: "",
    email: "",
    pincode: "",
    reply_to: "gamersstore@awesomestore.com",
  });
  const overide = {
    width: "10px",
  };
  const [loading, setloading] = useState(false);
  console.log(details.email);
  let price = useSelector(state => state.BuyInfo.previous_sum);
  price = parseFloat(price.replace(/,/g, ""));
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async e => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      setloading(true);
      try {
        const {id} = paymentMethod;
        const response = await axios.post(
          "https://gamerstopbymarcrove.herokuapp.com/api/pay/checkout",
          {
            amount: Math.ceil(price),
            id,
          }
        );
        console.log(response);
        if (response.data.status == "success") {
          sendMail();
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  function sendMail() {
    emailjs
      .send(
        "service_6aed515",
        "template_xf3fx9k",
        details,
        "user_mjBe7qTYY8dr33SPkrIUE"
      )
      .then(
        response => {
          console.log(response);
          setloading(false);
        },
        err => {
          console.log(err);
          setloading(false);
        }
      );
  }
  function handleChange(e) {
    setdetails({...details, [e.target.name]: e.target.value});
  }
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="form_body">
        <div className="form_outer">
          <div className="f_outer">
            <div className="f_inner child0">
              <div className="inner_name"></div>
              <div className="inner_name_inp"></div>
            </div>

            <div className="f_inner child1">
              <div className="inner_name">NAME</div>
              <div className="inner_name_inp">
                <input
                  type="text"
                  name="user_name"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child2">
              <div className="inner_name">ADDRESS</div>
              <div className="inner_name_inp">
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child3">
              <div className="inner_name">EMAIL</div>
              <div className="inner_name_inp">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child4">
              <div className="inner_name">PINCODE</div>
              <div className="inner_name_inp">
                <input
                  type="pincode"
                  name="pincode"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child5">
              <div className="inner_name"></div>
              <div className="inner_name_inp"></div>
            </div>
            <div className="f_inner child7">
              <div className="inner_name"></div>
              <div className="inner_name_inp"></div>
            </div>
            <div className="f_inner child6"></div>
            <div className="f_inner child10">
              <form className="chi" style={{width: "100%", height: "100%"}}>
                <CardElement />
              </form>
            </div>
            <div className="f_inner child9">
              <div className="inner_name buy_btn">
                <button onClick={handleSubmit} className="but_btnn">
                  <p className="buybtnnn">
                    <>
                      {" "}
                      {loading ? (
                        <SyncLoader size={5} css={overide} color={"yellow"} />
                      ) : (
                        `Buy`
                      )}
                    </>
                  </p>
                </button>
              </div>
            </div>

            <div className="f_inner child8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
