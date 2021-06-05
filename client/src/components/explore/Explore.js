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
import Skeleton from "react-loading-skeleton";
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

const useStyles = makeStyles({
  root: {
    width: 280,

    color: "black",
    height: 400,
  },
  media: {
    height: 250,
  },
  fonta: {
    color: "#5097e9",
    fontWeight: "Bold",
    fontSize: "1.6vw",
    height: 50,
  },
});

function Explore() {
  const history = useHistory();
  const classes = useStyles();
  const [retdataa, setretdataa] = useState([]);
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setretdataa(response.data);
      })
      .catch(function (error) {});
  }
  function stringsplit(str) {
    console.log(str.split("/")[1]);
    return str.split("/")[1];
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="outer-box">
      <p className="heading_log">Explore more in Store</p>
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
                    <Button size="small" color="primary" variant="outlined">
                      {"₹" + b.price}
                    </Button>

                    <Button
                      className={classes.butt}
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => history.push("/product/" + b._id)}
                    >
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })
        ) : (
          <div className="cart-child">
            <Skeleton count={4} height={50} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
