import React from "react";
import Header from "../Header/index";
import "../../Styles/admin.css";
function index() {
  return (
    <div className="admin_outer">
      <Header />
      <div className="main_outer">main Body</div>
    </div>
  );
}

export default index;
