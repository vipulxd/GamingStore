import {React, useState, useEffect} from "react";
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

export default function SmallCard(props) {
  const [datatesta, setdatatesta] = useState();

  const classes = useStyles();

  useEffect(() => {
    setdatatesta(props.data);
  }, []);
  console.log(datatesta);
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={Image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h6" component="h6" color="primary">
              awdaw
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="outlined">
            123
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
}
