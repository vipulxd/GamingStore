import {React, useState, useEffect} from "react";
import "../../Styles/explore.css";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    width: 300,

    color: "black",
    height: 300,
  },
  media: {
    height: 210,
  },
  fonta: {
    margin: 0,
    margin: 0,
    textAlign: "center",
    lineHeight: 0.1,
    color: "black",
    fontWeight: "light",
    fontSize: "1.6vw",
    height: 10,
  },
});

function Explore() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [retdataa, setretdataa] = useState([]);
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setretdataa(response.data);
      })
      .catch(function (error) {});
  }
  const user = localStorage.getItem("_email");
  function onhandleClick(idofprod) {
    if (user) {
      handleClick();
      onhandleRedirect(idofprod);
    } else {
      setOpen(true);
    }
  }

  const onhandleRedirect = idofprod => history.push("/product/" + idofprod);
  function stringsplit(str) {
    console.log(str.split("/")[1]);
    return str.split("/")[1];
  }
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="outer-box">
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
      <p className="heading_log" style={{color: "whitesmoke"}}>
        Explore more in Store
      </p>
      <div className="card_outer_explorer">
        {" "}
        {retdataa.length > 0 ? (
          retdataa.map(b => {
            return (
              <div className="cards_explorer">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={
                        // "/static/images.jpg"
                        "https://gamerstopbymarcrove.herokuapp.com/" +
                        stringsplit(b.image)
                      }
                      title={b.name}
                    />
                    <CardContent>
                      <Typography
                        className={classes.fonta}
                        variant="h6"
                        component="h6"
                        color="primary"
                      >
                        {b.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <p className="price-show"> {"₹" + b.price}</p>

                    <Button
                      className={classes.butt}
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => onhandleClick(b._id)}
                      style={{
                        backgroundColor: "black",
                        marginLeft: "30px",
                        color: "white",
                      }}
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
                <Skeleton count={5} />
              </p>
            </SkeletonTheme>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
