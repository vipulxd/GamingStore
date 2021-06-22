import React from "react";
import "./Styles/App.css";
import Admin from "./components/Admin/Admin";
import Home from "./pages/Home";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import Error from "./components/Error/Error";
import {Elements} from "@stripe/react-stripe-js";
import Cart from "./pages/Cart";
import {useSelector} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/About";
import Product from "./pages/Product";
import MostPurchase from "./components/Most-purchased";
import Auth from "./pages/Auth";
function App() {
  const isAdmin = useSelector(state => state.UserInfo.acctype);

  var access_to_admin_route = 0;
  if (isAdmin === "Admin") access_to_admin_route = Boolean(1);
  const stripePromise = loadStripe(
    "pk_test_51IyivBSBevftQuaAIhrFBQ1b90xAYfqVkysZyDXshrS6vG7I8lAxJgQw7zVgaxexgNLbnXTDTyQjEiJXweZXRTIq00eBPB3M1M"
  );
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
