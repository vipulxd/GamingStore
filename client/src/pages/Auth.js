import {React, useState, useEffect} from "react";
import Fade from "react-reveal/Fade";
import Header from "../components/Header";
import LoginComp from "../components/Login";
import Register from "../components/Register";
import "../Styles/auth.css";
function Auth() {
  const [reg, setreg] = useState(false);
  const [log, setlog] = useState(false);
  function handleClickLog() {
    setreg(false);
    setlog(true);
  }
  function handleClickReg() {
    setlog(false);
    setreg(true);
  }
  useEffect(() => {
    setlog(true);
  }, []);
  return (
    <div>
      <Header />
      <div className="auth_a_outer">
        <div className="auth_b_outer ab top_left">
          <div className="auth_button">
            <button onClick={handleClickLog}>
              <p className="btn_tmp">Login</p>
            </button>
          </div>
        </div>
        <div className="auth_b_outer ab top_right">
          <div className="auth_button">
            <button onClick={handleClickReg}>
              <p className="btn_tmp">Register</p>
            </button>
          </div>
        </div>
        <div className="auth_b_outer ab bottom_left">
          <Fade left when={log}>
            <LoginComp />
          </Fade>
        </div>
        <div className="auth_b_outer ab bottom_right">
          <Fade right when={reg}>
            <Register />
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Auth;
