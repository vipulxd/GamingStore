import {React, useState} from "react";
import "../../Styles/auth.css";
import axios from "axios";
function LoginComp() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  function onSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:9000/api/log/login", data)
      .then(res => {
        console.error(res.data.token);
      })
      .catch(error => {});
  }

  function handleClick(e) {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  console.log(data);
  return (
    <div className="log_outer">
      <div className="log_inner span3"></div>
      <div className="log_inner"></div>
      <div className="log_inner"></div>
      <div className="log_inner">Email</div>
      <div className="log_inner">
        <input type="email" name="email" onChange={handleClick}></input>
      </div>
      <div className="log_inner">Password</div>
      <div className="log_inner">
        <input type="passoword" name="password" onChange={handleClick}></input>
      </div>
      <div className="log_inner"></div>
      <div className="log_inner">
        <button style={{height: "30%"}} onClick={onSubmit}>
          {" "}
          <p style={{color: "white", fontWeight: "600"}}>Login</p>
        </button>
      </div>
    </div>
  );
}

export default LoginComp;
