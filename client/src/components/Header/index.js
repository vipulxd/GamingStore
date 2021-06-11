import {React} from "react";
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

  const history = useHistory();

  const noOfGames = useSelector(state => state.CartInfo.products);

  return (
    <div className="header_outer">
      <div className="title_heading">
        <SportsEsportsIcon
          onClick={() => history.push("/")}
          style={{fontSize: "100px", color: "whitesmoke"}}
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
              marginTop: "0px",
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
          <div className="header_log_btn">
            <Logout />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Header;
