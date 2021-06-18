import React from "react";
import "../../Styles/temp.css";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import image from "../../pages/wp4517150-call-of-duty-modern-warfare-2019-wallpapers.jpg";
const useStyles = makeStyles({
  media: {
    height: 300,
    width: 310,
    borderRadius: 20,
    boxShadow: "inset 3px 3px 5px 6px #444",
  },
});
function ItemCart() {
  const classes = useStyles();
  return (
    <div className="tempa">
      <div className="tempb">
        <CardMedia className={classes.media} image={image} title={"hello"} />
      </div>
      <div className="tempc">
        <div className="tempd">Call of Duty</div>
        <div className="tempe"> ⭐️⭐️⭐️⭐️⭐️⭐️⭐️</div>
        <div className="tempf">
          <div className="card_button">
            <button>
              <p style={{color: "white"}}>Buy</p>
            </button>
          </div>
          <div className="card_button">
            <button>
              {" "}
              <p style={{color: "white"}}>Cart</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCart;
