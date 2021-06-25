import {React, useEffect} from "react";
import "./Styles/App.css";
import Admin from "./components/Admin/Admin";
import Home from "./pages/Home";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {enable_buy} from "./redux";

import {loadStripe} from "@stripe/stripe-js";
import Error from "./components/Error/Error";
import {Elements} from "@stripe/react-stripe-js";
import Cart from "./pages/Cart";
import {useSelector, useDispatch} from "react-redux";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PaymentRoute from "./components/Routes/PaymentRoutes";
import About from "./components/About";
import Product from "./pages/Product";
import Payment from "./pages/Payment";
import MostPurchase from "./components/Most-purchased";
import Auth from "./pages/Auth";
import jwt_decode from "jwt-decode";
import {addUser, userType} from "./redux/User/UserAction";

function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.UserInfo.acctype);
  const Payment_enable = useSelector(state => state.BuyInfo.enable_buy);
  function trigger() {
    if (localStorage.token) {
      dispatch(enable_buy());
      const token = localStorage.token;
      const decode = jwt_decode(token);

      dispatch(addUser(decode));
      if (decode.id === "60d2213b9edf96191531a809") {
        dispatch(userType());
      }
    }
  }

  var access_to_admin_route = 0;
  if (isAdmin === "admin") access_to_admin_route = Boolean(1);
  const stripePromise = loadStripe(
    "pk_test_51IyivBSBevftQuaAIhrFBQ1b90xAYfqVkysZyDXshrS6vG7I8lAxJgQw7zVgaxexgNLbnXTDTyQjEiJXweZXRTIq00eBPB3M1M"
  );
  useEffect(() => {
    trigger();
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute
            component={Admin}
            isAuthenticated={access_to_admin_route}
            path="/admin"
            exact
          />
          <PaymentRoute
            EnablePayment={Payment_enable}
            path="/payment"
            component={Payment}
          />
          <Route path="/auth" exact component={Auth}></Route>
          <Route path="/temp" component={MostPurchase}></Route>
          <Route path="/about" component={About} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/product/:prod_id" exact component={Product} />
          <Route
            path="/api/*"
            component={Error}
            appProps={{access_to_admin_route}}
          />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
