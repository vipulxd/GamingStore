import {React, useState, useEffect} from "react";
import "../../Styles/releases.css";
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
    width: 350,
    // backgroundColor: "black",
    color: "black",
  },
  media: {
    height: 380,
  },
  fonta: {
    color: "#5097e9",
    fontWeight: "Bold",
    fontSize: "1.6vw",
    height: 50,
  },
});

function Releases() {
  const classes = useStyles();
  const [retdata, setretdata] = useState([]);
  async function fetchdata() {
    await axios
      .get(
        "https://gamerstopbymarcrove.herokuapp.com/api/product/" ||
          "https://gamerstopbymarcrove.herokuapp.com/api/product/"
      )
      .then(function (response) {
        setretdata(response.data);
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="outer-box">
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
                      image={"http://localhost:9000/" + a.createdAt + ".jpg"}
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
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      className={classes.button}
                    >
                      {"$" + a.price}
                    </Button>

                    <Button
                      className={classes.butt}
                      size="medium"
                      color="secondary"
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

export default Releases;
