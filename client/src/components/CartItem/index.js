import React, {useEffect, useState} from "react";
import "../../Styles/cart.css";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Fade from "react-reveal/Fade";
import {delprod} from "../../redux/Cart/CartActions";
import {useSelector, useDispatch} from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({
  media: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    boxShadow: "inset 3px 3px 5px 2px #111",
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

function CartItem() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [item, setitem] = useState([]);
  let loaded = false;
  const items = useSelector(state => state.CartInfo.products);
  async function fetchData() {
    setitem(items);
  }
  function stringsplit(str) {
    return str.split("/")[1];
  }
  function removeitem(id) {}
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
        return "⭐️⭐️⭐️⭐️";
        break;
      case 7:
        return "⭐️⭐️⭐️⭐️";
        break;
      case 8:
        return "⭐️⭐️⭐️";
        break;
      case 9:
        return "⭐️⭐️⭐️⭐️";
        break;
      case 10:
        return "⭐️⭐️⭐️⭐️⭐️";
        break;

      default:
        return "Not Rated";
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="cat1">
      <Fade bottom>
        {item.length > 0 ? (
          item.map(s => {
            return (
              <div className="cat2">
                <div className="cat21 cat211">
                  <CardMedia
                    className={classes.media}
                    image={
                      // "/static/images.jpg"
                      "https://gamerstopbymarcrove.herokuapp.com/" +
                      stringsplit(s.image)
                    }
                    title={"hello"}
                  />
                </div>
                <div className="cat21">
                  <p>{findrating(s.rating)}</p>
                </div>
                <div className="cat21">
                  <p>{s.price}</p>
                </div>
                <div className="cat21">{s.name}</div>
                <div className="cat21 butt">
                  <button
                    onClick={() => dispatch(delprod(s._id))}
                    className="button_cart"
                  >
                    <p>Remove</p>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              fontSize: 40,
              backgroundColor: "transparent",
              lineHeight: 1.1,
            }}
          >
            <SkeletonTheme color="#202020" highlightColor="#444">
              <p>
                <Skeleton count={8} />
              </p>
            </SkeletonTheme>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default CartItem;
