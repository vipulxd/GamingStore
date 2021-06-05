import {useState, useEffect, React} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";
import Header from "../components/Header/index";
import Skeleton from "react-loading-skeleton";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import MuiAlert from "@material-ui/lab/Alert";

import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {color: "#fce883"},
      "::placeholder": {color: "#87bbfd"},
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function Product() {
  const {prod_id} = useParams();
  const stripe = useStripe();
  const [success, setsuccess] = useState(false);
  const elements = useElements();
  const [name, setname] = useState();
  const [createdat, setcreatedat] = useState();
  const [price, setprice] = useState();
  const [rating, setrating] = useState();
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();
  const [isfetched, setfetched] = useState(false);
  const [loading, setload] = useState(false);

  async function getdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/" + prod_id)
      .then(function (response) {
        setfetched(true);
        setname(response.data.name);
        setcreatedat(response.data.image.split("/")[1]);
        setprice(response.data.price);
        console.log(response.data);
        setrating(response.data.rating);
      })
      .catch(function (error) {
        setmessage(error);
      });
  }
  function findrating(r) {
    switch (r) {
      case 1:
        return "⭐️";
        break;
      case 2:
        return "⭐️⭐️";
        break;
      case 3:
        return "⭐️⭐️⭐️";
        break;
      case 4:
        return "⭐️⭐️⭐️⭐️";
        break;
      case 5:
        return "⭐️⭐️⭐️⭐️⭐️";
        break;
      case 6:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐";
        break;
      case 7:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 8:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 9:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 10:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;

      default:
        return "Not Rated";
    }
  }

  // Payment handler
  const handleSubmit = async e => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
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
          setOpen(true);
          setload(false);
          setsuccess(true);
          setmessage(
            "Thank you for the purchase the receipt has been sent to email"
          );
        } else {
          setOpen(true);
          setmessage("Payment Failed , Reason :" + response.data.reason);
          setload(false);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function setloading() {
    setload(true);
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outer-crrt">
      <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success ? "success" : "error"}>
          {message}
        </Alert>
      </Snackbar>
      <Header />
      {isfetched ? (
        <div className="cart-body">
          <div className="cart-child">
            <img
              src={`https://gamerstopbymarcrove.herokuapp.com/${createdat}`}
              alt={name}
            />
          </div>
          <div className="cart-child">
            <h1 className="cartele">{name}</h1>
            <h4 className="cartele">₹ {price} </h4>
            <h4 className="cartele">{findrating(rating)}</h4>

            <form onSubmit={handleSubmit}>
              <fieldset className="FormGroup">
                <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
                </div>
              </fieldset>
              <button onClick={setloading}>
                {loading ? <p>loading</p> : <p>buy</p>}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="cart-child">
          <Skeleton count={4} height={50} />
        </div>
      )}
    </div>
  );
}

export default Product;
