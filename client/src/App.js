import React from "react";
import "./Styles/App.css";
import Admin from "./components/Admin";
import Home from "./pages/Home";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Error from "./components/Error/Error";
import Cart from "./pages/Cart";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/admin" component={Admin} />
        <Route path="/cart" exact component={Cart} />

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
