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
import Image from "../../_downloadfiles_wallpapers_1280_720_tom_clancys_ghost_recon_wildlands_hd_4k_8k_17497.jpg";
const useStyles = makeStyles({
  root: {
    width: 280,
    // backgroundColor: "black",
    color: "black",
  },
  media: {
    height: 200,
  },
  fonta: {
    color: "#5097e9",
    fontWeight: "Bold",
  },
});

function Releases() {
  const classes = useStyles();
  const [retdata, setretdata] = useState([]);
  async function fetchdata() {
    await axios
      .get("http://localhost:9000/api/product/")
      .then(function (response) {
        console.log(response);
        setretdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchdata();
  }, []);
  console.log(retdata);
  return (
    <div className="outer-box">
      <p className="heading_log">Recent releases</p>
      <div className="card_outer">
        {" "}
        {retdata.length > 0 ? (
          retdata.map(a => {
            return (
              <div className="cards">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={Image}
                      title="Contemplative Reptile"
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
                    <Button size="small" color="primary" variant="outlined">
                      Add to Cart
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

export default Releases;
