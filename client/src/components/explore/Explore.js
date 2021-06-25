import {React, useState, useEffect} from "react";
import "../../Styles/explore.css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

import CardMedia from "@material-ui/core/CardMedia";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {addprod} from "../../redux/";
import {useDispatch} from "react-redux";
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
    height: 300,
    width: 310,
    borderRadius: 10,
    boxShadow: "inset 1px 3px 5px 2px #333",
  },
});

function Explore() {
  const dispatch = useDispatch();
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
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐";
        break;
      case 7:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 8:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 9:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 10:
        return "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️";
        break;

      default:
        return "Not Rated";
    }
  }
  function addState(a) {
    dispatch(addprod(a));
    setOpen(true);
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Added to Cart
        </Alert>
      </Snackbar>

      <p className="heading_log" style={{color: "whitesmoke"}}>
        Explore more in Store
      </p>
      <div className="card_outer_explorer">
        {" "}
        {retdataa.length > 0 ? (
          retdataa.map(b => {
            return (
              <div className="tempea">
                <div className="tempeb">
                  <CardMedia
                    className={classes.media}
                    image={
                      "https://gamerstopbymarcrove.herokuapp.com/" +
                      stringsplit(b.image)
                    }
                    title={"hello"}
                  />
                </div>
                <div className="tempc">
                  <div className="tempd">{b.name}</div>
                  <div className="tempe"> {findrating(b.rating)}</div>
                  <div className="tempf">
                    <div className="card_button">
                      <button
                        style={{cursor: "pointer"}}
                        onClick={() => onhandleRedirect(b._id)}
                      >
                        <p style={{color: "white"}}>Buy</p>
                      </button>
                    </div>
                    <div className="card_button">
                      <button
                        style={{
                          backgroundColor: "grey",
                          border: "1px solid black",
                          cursor: "pointer",
                        }}
                        onClick={() => addState(b)}
                      >
                        {" "}
                        <p style={{color: "white"}}>Add to Cart</p>
                      </button>
                    </div>
                  </div>
                </div>
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
