import React from "react";
import Button from "@material-ui/core/Button";
import {useGoogleLogin} from "react-google-login";
// refresh token
import {refreshTokenSetup} from "./refreshToken";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/";
const clientId =
  "466213360522-t1oecjs0uv3rltpe4mr0pemhqqs1bt0s.apps.googleusercontent.com";

function Login() {
  var dispatch = useDispatch();
  const onSuccess = res => {
    localStorage.setItem("_user_name", res.profileObj.name);
    localStorage.setItem("_email", res.profileObj.email);
    refreshTokenSetup(res);

    window.location.reload();
    setTimeout(() => {
      stateDispatcher();
    }, 4000);
  };
  function stateDispatcher() {
    dispatch(addUser(localStorage.getItem("_email")));
  }
  const onFailure = res => {};
  const {signIn} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
  });

  return (
    <div>
      <div className="_headers_log_btn">
        {/* <GoogleLogin
        clientId={clientId}
        // buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{marginTop: "100px"}}
        isSignedIn={true}
      /> */}
        <Button
          variant="contained"
          color="primary"
          className="header_log_btn"
          onClick={signIn}
          style={{backgroundColor: "rgb(80, 151, 233)", marginLeft: "10px"}}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
