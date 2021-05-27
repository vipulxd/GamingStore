import React from "react";
import "../../Styles/header.css";
import {NavLink} from "react-router-dom";
import Search from "./Search";
import Login from "../Loggers/Login";
import Button from "@material-ui/core/Button";
import Logout from "../Loggers/Logout";
function Header() {
  const _user = localStorage.getItem("_user_name");
  const _mail = localStorage.getItem("_email");

  return (
    <div className="header_outer">
      <div className="title_heading">
        <heading>Gamer's Stop</heading>
      </div>
      <div className="search_box">
        <Search />
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
