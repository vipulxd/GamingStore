import React from "react";
import "../../Styles/header.css";
import {NavLink} from "react-router-dom";
import Search from "./Search";
import Login from "../Loggers/Login";
import Button from "@material-ui/core/Button";
import Logout from "../Loggers/Logout";
import {useSelector} from "react-redux";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
function Header() {
  const _user = localStorage.getItem("_user_name");
  const _mail = localStorage.getItem("_email");
  const noOfGames = useSelector(state => state.CartInfo.products);
  return (
    <div className="header_outer">
      <div className="title_heading">
        <h3>
          <a href="/">Gamer's Stop</a>
        </h3>
      </div>
      <div className="search_box">
        <Search />
      </div>
      <div className="cart-of-header">
        <NavLink to="/cart">
          <Button
            variant="contained"
            color="primary"
            className="header_log_btn"
            style={{
              backgroundColor: "rgb(80, 151, 233)",
              marginBottom: "10px",
              width: "130px",
            }}
          >
            <AddShoppingCartIcon />
            <p className="cartnos"> Cart </p>
            <span className="cartnos">
              {_mail && noOfGames.length ? noOfGames.length : null}
            </span>
          </Button>
        </NavLink>
      </div>
      <div classNAme="header_logger">
        {_user ? (
          <>
            {" "}
            {_mail === "vipul.xtr@gmail.com" ? (
              <div className="admin_butt">
                <NavLink to="/admin">
                  <span>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      className="header_log_btn"
                      style={{
                        backgroundColor: "rgb(80, 151, 233)",
                        marginBottom: "10px",
                      }}
                    >
                      Admin Panel
                    </Button>
                  </span>
                </NavLink>
              </div>
            ) : (
              <></>
            )}
            <Logout />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default Header;
