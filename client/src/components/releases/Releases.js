import {React, useState, useEffect, useLayoutEffect} from "react";
import "../../Styles/releases.css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fade from "react-reveal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    width: 350,
    height: 500,
    color: "#444",
    borderRadius: "40px",
  },
  media: {
    height: 400,
    width: 310,
    borderRadius: 10,
    boxShadow: "inset 3px 3px 5px 2px #444",
  },
  fonta: {
    margin: 0,
    textAlign: "center",
    lineHeight: 0.1,
    color: "#444",
    fontWeight: "Bold",
    fontSize: "2vw",
    height: 10,
  },
});

const useStylesa = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

function Releases() {
  const history = useHistory();

  const classesa = useStylesa();
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const [retdata, setretdata] = useState([]);

  const user = localStorage.getItem("_email");
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setretdata(response.data);
      })
      .catch(function (error) {});
  }
  function findrating(r) {
    switch (r) {
      case 1:
        return "⭐️";
        break;
      case 2:
        return "⭐️⭐️";
        break;
      case 3:
        return "⭐️⭐️⭐️";
        break;
      case 4:
        return "⭐️⭐️⭐️⭐️";
        break;
      case 5:
        return "⭐️⭐️⭐️⭐️⭐️";
        break;
      case 6:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐";
        break;
      case 7:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 8:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 9:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 10:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;

      default:
        return "Not Rated";
    }
  }

  function onhandleClick(idofprod) {
    if (user) {
      handleClick();
      onhandleRedirect(idofprod);
    } else {
      setOpen(true);
    }
    // dispatch(addprod(idofprod));
  }
  const onhandleRedirect = idofprod => history.push("/product/" + idofprod);
  const handleClick = () => {
    setOpen(true);
  };
  function stringsplit(str) {
    return str.split("/")[1];
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  console.log(retdata);
  return (
    <div className="outer-box">
      <div className={classesa.root}>
        {user ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Added to Cart
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Please Login First
            </Alert>
          </Snackbar>
        )}
      </div>

      <div className="releases-outer">
        <p className="heading_log" style={{color: "whitesmoke"}}>
          Recent releases
        </p>

        <div className="card_outer_releases">
          {" "}
          {retdata.length > 0 ? (
            retdata.slice(Math.max(retdata.length - 3, 0)).map(a => {
              return (
                <Fade left>
                  <div className="tempa">
                    <div className="tempb">
                      <CardMedia
                        className={classes.media}
                        image={
                          // "/static/images.jpg"
                          "https://gamerstopbymarcrove.herokuapp.com/" +
                          stringsplit(a.image)
                        }
                        title={"hello"}
                      />
                    </div>
                    <div className="tempc">
                      <div className="tempd">{a.name}</div>
                      <div className="tempe"> {findrating(a.rating)}</div>
                      <div className="tempf">
                        <div className="card_button">
                          <button>
                            <p style={{color: "white"}}>Buy</p>
                          </button>
                        </div>
                        <div className="card_button">
                          <button>
                            {" "}
                            <p style={{color: "white"}}> Add to Cart</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })
          ) : (
            <div className="cart-child" style={{fontSize: 50, lineHeight: 1.1}}>
              <SkeletonTheme color="#202020" highlightColor="#444">
                <p>
                  <Skeleton count={6} />
                </p>
              </SkeletonTheme>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Releases;
