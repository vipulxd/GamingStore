import {useState, useEffect, React} from "react";
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";
import Header from "../components/Header/index";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import MuiAlert from "@material-ui/lab/Alert";
import {css} from "@emotion/react";
import Snackbar from "@material-ui/core/Snackbar";
import Reveal from "react-reveal/Reveal";
import {useSelector} from "react-redux";
import {sum_add} from "../redux/Purchase/purchaseAction";
import {useDispatch} from "react-redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Product() {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.UserInfo.authenticated);
  const history = useHistory();
  const [loadinga, setLoading] = useState(true);

  const {prod_id} = useParams();
  const stripe = useStripe();
  const [success, setsuccess] = useState(false);
  const elements = useElements();
  const [name, setname] = useState();
  const [createdata, setcreatedata] = useState();
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
        setname(response.data.name);
        setcreatedata(response.data.image.split("/")[1]);
        setprice(response.data.price);

        setrating(response.data.rating);
        setfetched(true);
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
            amount: Math.ceil(200),
            id,
          }
        );

        if (response.data.status == "success") {
          setOpen(true);
          setload(false);
          setLoading(false);
          setsuccess(true);
          setmessage(
            "Thank you for the purchase . Download link will be sent to you"
          );
        } else {
          setOpen(true);
          setmessage("Payment Failed , Reason :" + response.data.reason);
          setload(false);
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

  function handleRedirect() {
    if (authenticated) {
      dispatch(sum_add(price));
      history.push("/payment");
    } else {
      history.push("/auth");
    }
  }
  function setloading() {
    setload(true);
  }

  function stringsplit(name) {
    return name.split("/")[1];
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
        <Reveal effect="fadeInUp">
          <div className="temp1">
            <div className="baby-temp1 bbytmp">
              {
                <img
                  src={`https://gamerstopbymarcrove.herokuapp.com/${createdata}`}
                  alt={name}
                />
              }
            </div>
            <div className="baby-temp2 bbytmp">
              <h1>{name}</h1>
            </div>
            <div className="baby-temp3 bbytmp">{"₹" + " " + price}</div>
            <div className="baby-temp4 bbytmp">{findrating(rating)}</div>
            <div className="baby-temp5 bbytmp">
              <button onClick={() => handleRedirect(price)}>
                <p className="temp78">Add to Cart</p>
              </button>
            </div>
            <div className="baby-temp5 bbytmp">
              {" "}
              <button onClick={handleRedirect}>
                <p className="temp78">Buy Now</p>
              </button>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="cart-child" style={{fontSize: 50, lineHeight: 1.1}}>
          <SkeletonTheme color="#202020" highlightColor="black">
            <p>
              <Skeleton count={6} />
            </p>
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}

export default Product;
