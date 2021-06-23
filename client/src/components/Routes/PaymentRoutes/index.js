import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";

const PaymentRoute = ({component: Component, EnablePayment, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      EnablePayment ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: "/", state: {from: props.location}}} />
      )
    }
  />
);

export default PaymentRoute;
