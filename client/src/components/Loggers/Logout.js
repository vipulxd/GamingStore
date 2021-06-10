import React from "react";
import {useGoogleLogout} from "react-google-login";
import Button from "@material-ui/core/Button";

const clientId =
  "466213360522-t1oecjs0uv3rltpe4mr0pemhqqs1bt0s.apps.googleusercontent.com";

export default function Logout() {
  const onLogoutSuccess = () => {
    localStorage.removeItem("_user_name");
    localStorage.removeItem("_email");
    window.location.reload();
  };
  const {signOut} = useGoogleLogout({
    onLogoutSuccess,
    clientId,
  });
  return (
    <div className="_headers_log_btn">
      {/* <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout> */}
      <Button
        variant="contained"
        color="primary"
        className="header_log_btn"
        onClick={signOut}
        style={{
          backgroundColor: "black",
          marginLeft: "10px",
          marginTop: "30px",
        }}
      >
        <p className="cartnos">Logout</p>
      </Button>
    </div>
  );
}
