import {React, useState, useEffect} from "react";
import "../../Styles/header-temp.css";
import {NavLink, useHistory} from "react-router-dom";
import Search from "./Search";
import Login from "../Loggers/Login";
import Button from "@material-ui/core/Button";
import Logout from "../Loggers/Logout";
import {useSelector} from "react-redux";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
function Header() {
  const _user = localStorage.getItem("_user_name");
  const _mail = localStorage.getItem("_email");
  const [header, setHeader] = useState("header_outer");
  const history = useHistory();

  const noOfGames = useSelector(state => state.CartInfo.products);
  const listenScrollEvent = event => {
    if (window.scrollY < 73) {
      return setHeader("header_outer");
    } else if (window.scrollY > 70) {
      return setHeader("header2");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <div className={header}>
      <div className="title_heading">
        <SportsEsportsIcon
          onClick={() => window.open("/")}
          style={{fontSize: "100px", color: "black"}}
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
              backgroundColor: "black",
              marginTop: "30px",
              // width: "130px",
            }}
          >
            <ShoppingCartRoundedIcon style={{color: "white"}} />
            <p className="cartnos"> Cart </p>
            <span className="cartnos">
              {_mail && noOfGames.length ? noOfGames.length : null}
            </span>
          </Button>
        </NavLink>
      </div>
      <div classNAme="header_logger elementtop">
        {_user ? (
          <>
            {" "}
            {_mail === "vipul.xtr@gmail.com" ? (
              <div className="admin_butt elementtop">
                <NavLink to="/admin">
                  <span>
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      className="header_log_btn elementtop"
                      style={{
                        backgroundColor: "black",
                      }}
                    >
                      <p className="cartnos">Admin Panel</p>
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
