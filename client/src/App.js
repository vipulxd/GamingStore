import React from "react";
import "./Styles/App.css";
import Admin from "./components/Admin/Admin";
import Home from "./pages/Home";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Error from "./components/Error/Error";
import Cart from "./pages/Cart";
import {useSelector} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/About";
function App() {
  const isAdmin = useSelector(state => state.UserInfo.acctype);

  var access_to_admin_route = 0;
  if (isAdmin === "Admin") access_to_admin_route = Boolean(1);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <PrivateRoute
          component={Admin}
          isAuthenticated={access_to_admin_route}
          path="/admin"
          exact
        />
        <Route path="/about" component={About} />
        <Route path="/cart" exact component={Cart} />
        <Route
          path="/api/*"
          component={Error}
          appProps={{access_to_admin_route}}
        />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
