import {React, useState} from "react";
import {useHistory} from "react-router-dom";
import "../../Styles/auth.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useSelector, useDispatch} from "react-redux";
import {addUser, userType} from "../../redux/User/UserAction";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {enable_buy} from "../../redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function LoginComp() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();
  const history = useHistory();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  function onSubmit(e) {
    axios
      .post("https://gamerstopbymarcrove.herokuapp.com/api/log/login", data)
      .then(res => {
        setItems(res);
        dispatch(enable_buy);
        setOpen(true);
      })
      .catch(error => {
        setmessage("Not found");
        setOpen(true);
      });
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function setItems(a) {
    localStorage.setItem("token", a.data.token);

    const token = a.data.token;
    const decode = jwtDecode(token);
    console.log(decode);
    dispatch(addUser(decode));
    if (decode.id === "60d2213b9edf96191531a809") {
      dispatch(userType());
    }
    dispatch(enable_buy());
    history.goBack();
  }

  function handleClick(e) {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  console.log(data);
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
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
          <input
            type="passoword"
            name="password"
            onChange={handleClick}
          ></input>
        </div>
        <div className="log_inner"></div>
        <div className="log_inner">
          <button style={{height: "20%", cursor: "pointer"}} onClick={onSubmit}>
            {" "}
            <p style={{color: "white", fontWeight: "600"}}>Login</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
