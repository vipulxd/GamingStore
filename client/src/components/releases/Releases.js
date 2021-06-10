import {React, useState, useEffect} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {addprod} from "../../redux/";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    width: 350,

    color: "black",
  },
  media: {
    height: 380,
  },
  fonta: {
    color: "black",
    fontWeight: "Bold",
    fontSize: "2vw",
    height: 50,
  },
});

const useStylesa = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {color: "#fce883"},
      "::placeholder": {color: "#87bbfd"},
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function Releases() {
  const history = useHistory();
  const noofGames = useSelector(state => state.CartInfo.products);

  const classesa = useStylesa();
  const [open, setOpen] = useState(false);
  const [logged, setlogged] = useState(false);
  const [prod, setprod] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [retdata, setretdata] = useState([]);
  const [loaded, setload] = useState(false);
  const user = localStorage.getItem("_email");
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setretdata(response.data);
        setload(true);
      })
      .catch(function (error) {});
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
        <p className="heading_log">Recent releases</p>
        <div className="card_outer_releases">
          {" "}
          {retdata.length > 0 ? (
            retdata.slice(Math.max(retdata.length - 3, 0)).map(a => {
              return (
                <div className="cards_releases">
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={
                          //   "/static/images.jpg"
                          "https://gamerstopbymarcrove.herokuapp.com/" +
                          stringsplit(a.image)
                        }
                        title={a.name}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="h6"
                          className={classes.fonta}
                        >
                          {a.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <p className="price-show"> {"₹" + a.price}</p>
                      {/* </Button> */}
                      <Button
                        className={classes.butt}
                        size="medium"
                        color="secondary"
                        variant="outlined"
                        onClick={() => onhandleClick(a._id)}
                        style={{backgroundColor: "black", marginLeft: "20px"}}
                      >
                        <p className="buy-btn">Buy</p>
                      </Button>
                    </CardActions>
                  </Card>
                </div>
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
