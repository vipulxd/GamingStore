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
});

function Explore() {
  const classes = useStyles();
  const [retdataa, setretdataa] = useState([]);
  async function fetchdata() {
    await axios
      .get("http://localhost:9000/api/product/")
      .then(function (response) {
        console.log(response);
        setretdataa(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchdata();
  }, []);
  console.log(retdataa);
  return (
    <div className="outer-box">
      <p className="heading_log">Explore more in Store</p>
      <div className="card_outer">
        {" "}
        {retdataa.length > 0 ? (
          retdataa.map(b => {
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
                      <Typography variant="h6" component="h6" color="primary">
                        {b.name}
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

export default Explore;
