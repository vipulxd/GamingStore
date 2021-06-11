import {React, useState} from "react";
import {useSelector} from "react-redux";
import "../../Styles/header-temp.css";
import "../../Styles/search.css";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  cover: {
    width: 400,
    height: 100,
    borderRadius: 100,
  },
}));

function Search() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [prod, setprod] = useState();
  const prods = useSelector(state => state.ProdInfo);
  const [foundprod, setfoundproduct] = useState();
  const user = localStorage.getItem("_email");
  function handleChange(event) {
    event.preventDefault();
    setprod(event.target.value.toUpperCase());
    calcresult(event.target.value.toUpperCase());
  }
  function calcresult(v) {
    const result = prods.item_name.find(obj => {
      return obj.name.split(" ").find(word => word.toUpperCase() === v);
    });
    if (result) {
      setfoundproduct(result);
    } else {
      setfoundproduct();
    }
  }
  console.log(foundprod);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div className="outer_search">
      <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={user ? "success" : "error"}>
          Login to continue
        </Alert>
      </Snackbar>
      <div className="input_search">
        <input
          className="header_input"
          placeholder="What are you looking for  .."
          type="text"
          onChange={handleChange}
        />
        {foundprod && (
          <div
            className="result_search"
            onClick={() =>
              user ? history.push(`/product/${foundprod._id}`) : setOpen(true)
            }
          >
            <div className="child_search">
              <div className="child_search">
                <CardMedia
                  className={classes.cover}
                  image={
                    "https://gamerstopbymarcrove.herokuapp.com/" +
                    foundprod.image.split("/")[1]
                  }
                  title="Live from space album cover"
                />
              </div>
              <div className="child_elements">{foundprod.name} </div>
              <div className="child_elements">
                {"     " + "₹" + foundprod.price}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
