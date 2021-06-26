import {React, useState, useEffect} from "react";
import "../../Styles/header-temp.css";
import {NavLink, useHistory} from "react-router-dom";
import Search from "./Search";
import Button from "@material-ui/core/Button";

import {useSelector, useDispatch} from "react-redux";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Shake from "react-reveal/Shake";
import FlagIcon from "@material-ui/icons/Flag";
import {addUser, removeUser} from "../../redux/User/UserAction";
function Header() {
  const dispatch = useDispatch();

  const [count, setcount] = useState(false);
  const history = useHistory();

  const noOfGames = useSelector(state => state.CartInfo.products);
  const Logged = useSelector(state => state.UserInfo.authenticated);
  const acctype = useSelector(state => state.UserInfo.acctype);
  function handleRedirect() {
    history.push("/auth");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(removeUser());
    history.push("/");
    window.location.reload();
  }

  return (
    <div className="header_outer">
      <div className="title_heading">
        <FlagIcon
          onClick={() => history.push("/")}
          style={{fontSize: "100px", color: "yellow"}}
        />
      </div>
      <div className="search_box elementtop">
        <div className="input-box">
          <Search />
        </div>
      </div>
      <div className="cart-of-header elementtop">
        <NavLink to="/cart">
          <Button
            variant="contained"
            color="primary"
            className="header_log_btn elementtop"
            style={{
              backgroundColor: "grey",
              marginTop: "0px",
            }}
          >
            <ShoppingCartRoundedIcon
              style={{color: "white", marginRight: "5px"}}
            />
            <p className="cartnos"> Cart </p>
          </Button>
        </NavLink>
      </div>

      {acctype === "admin" ? (
        <Button
          variant="contained"
          color="primary"
          className="header_log_btn elementtop"
          onClick={() => history.push("/admin")}
          style={{
            backgroundColor: "grey",
            marginTop: "0px",
          }}
        >
          <AccountCircleIcon style={{color: "white", marginRight: "10px"}} />
          <p className="cartnos"> Admin Pannel </p>
        </Button>
      ) : (
        <></>
      )}

      {Logged ? (
        <Button
          variant="contained"
          color="primary"
          className="header_log_btn elementtop"
          onClick={handleLogout}
          style={{
            backgroundColor: "grey",
            marginTop: "0px",
          }}
        >
          <AccountCircleIcon style={{color: "white", marginRight: "5px"}} />
          <p className="cartnos"> Logout </p>
        </Button>
      ) : (
        <Shake>
          <Button
            variant="contained"
            color="primary"
            className="header_log_btn elementtop"
            onClick={handleRedirect}
            style={{
              backgroundColor: "grey",
              marginTop: "0px",
            }}
          >
            <AccountCircleIcon style={{color: "white", marginRight: "5px"}} />
            <p className="cartnos"> Login </p>
          </Button>
        </Shake>
      )}
    </div>
  );
}

export default Header;
