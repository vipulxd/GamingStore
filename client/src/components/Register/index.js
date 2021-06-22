import React from "react";
import "../../Styles/auth.css";
function index() {
  return (
    <div className="log_outer reg">
      <div className="log_inner span2"></div>
      <div className="log_inner">Name</div>
      <div className="log_inner">
        <input placeholder="Enter Name"></input>
      </div>
      <div className="log_inner">Email</div>
      <div className="log_inner">
        <input placeholder="Enter your email"></input>
      </div>
      <div className="log_inner">Password</div>
      <div className="log_inner">
        <div className="log_inner">
          <input placeholder="Enter your password"></input>
        </div>
      </div>
      <div className="log_inner"> Re-enter Password</div>
      <div className="log_inner">
        <div className="log_inner">
          <input placeholder="Re-enter your password"></input>
        </div>
      </div>
      <div className="log_inner"></div>
      <div className="log_inner">
        <button>
          <p style={{color: "white", fontWeight: "600"}}>Register</p>
        </button>
      </div>
    </div>
  );
}

export default index;
