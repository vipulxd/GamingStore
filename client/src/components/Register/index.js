import {React, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "../../Styles/auth.css";

function Register() {
  const history = useHistory();
  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "https://gamerstopbymarcrove.herokuapp.com/api/log/register",
        details
      )
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }
  function handleClick(e) {
    setdetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="log_outer reg">
      <div className="log_inner waste span2"></div>
      <div className="log_inner">Name</div>
      <div className="log_inner">
        <input
          className="log_input"
          placeholder="Enter Name"
          name="name"
          onChange={handleClick}
        ></input>
      </div>
      <div className="log_inner">Email</div>
      <div className="log_inner">
        <input
          className="log_input"
          placeholder="Enter your email"
          name="email"
          onChange={handleClick}
        ></input>
      </div>
      <div className="log_inner">Password</div>

      <div className="log_inner">
        <input
          className="log_input"
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleClick}
        ></input>
      </div>

      <div className="log_inner">Password</div>

      <div className="log_inner">
        <input
          className="log_input"
          type="password"
          placeholder="Re-enter your password"
          name="password2"
          onChange={handleClick}
        ></input>
      </div>
      <div className="log_inner"></div>
      <div className="log_inner">
        <button onClick={onSubmit}>
          <p style={{color: "white", fontWeight: "600"}}>Register</p>
        </button>
      </div>
    </div>
  );
}

export default Register;
