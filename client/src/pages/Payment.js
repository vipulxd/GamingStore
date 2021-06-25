import {React, useState} from "react";
import Header from "../components/Header";
import {useHistory} from "react-router-dom";
import "../Styles/payment.css";
import axios from "axios";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {useSelector} from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import emailjs from "emailjs-com";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
function Payment() {
  const redirect = useHistory();
  const [message, setmessage] = useState();
  const [open, setOpen] = useState();
  const [error, seterror] = useState(false);
  const [details, setdetails] = useState({
    name: "",
    address: "",
    email: "",
    pincode: "",
    reply_to: "gamersstore@awesomestore.com",
  });
  const overide = {
    width: "10px",
  };
  const [loading, setloading] = useState(false);

  let price = useSelector(state => state.BuyInfo.previous_sum);

  const stripe = useStripe();
  const elements = useElements();

  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: "30px",
          color: "#424770",
          fontFamily: "Open Sans, sans-serif",
          letterSpacing: "0.025em",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "blue",
        },
      },
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    price = price.toString();
    if (price.includes(",")) {
      price = parseFloat(price.replace(/,/g, ""));
    }

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

        if (response.data.status == "success") {
          setmessage(response.data.status);
          setOpen(true);
          sendMail();
          redirect.push("/");
        } else {
          setmessage("Payment Failed");
          seterror(true);
          setloading(false);
        }
      } catch (error) {}
    } else {
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          setloading(false);
        },
        err => {
          setloading(false);
        }
      );
  }
  function handleChange(e) {
    setdetails({...details, [e.target.name]: e.target.value});
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
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
                  name="name"
                  placeholder="John"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child2">
              <div className="inner_name">ADDRESS</div>
              <div className="inner_name_inp">
                <input
                  type="text"
                  placeholder="A 1/10 St. Xy Campus"
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
                  placeholder="john123@jonny.com"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="f_inner child4">
              <div className="inner_name">PINCODE</div>
              <div className="inner_name_inp">
                <input
                  placeholder="909090"
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
              <form className="chi" style={{width: "100%"}}>
                <CardElement {...createOptions()} />
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
