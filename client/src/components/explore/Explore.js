import {React, useState, useEffect} from "react";
import "../../Styles/explore.css";
// import SmallCard from "../Cards/SmallCard";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 280,
    // backgroundColor: "black",
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
  const classes = useStyles();
  const [retdataa, setretdataa] = useState([]);
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        setretdataa(response.data);
        console.log(response);
      })
      .catch(function (error) {});
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
                        b.createdAt +
                        ".jpg"
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
                      {"$" + b.price}
                    </Button>

                    <Button
                      className={classes.butt}
                      size="small"
                      color="primary"
                      variant="outlined"
                    >
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })
        ) : (
          <em>Loading</em>
        )}
      </div>
    </div>
  );
}

export default Explore;
