import {React, useState} from "react";
import {useSelector} from "react-redux";
import "../../Styles/header-temp.css";
// import "../../Styles/search.css";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  cover: {
    width: "250px",
    height: "100px",
    borderRadius: 20,
  },
}));

function Search() {
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
  function findRating(r) {
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
        return "⭐️⭐️⭐️";
        break;
      case 7:
        return "⭐️⭐️⭐️⭐️";
        break;
      case 8:
        return "⭐️⭐️⭐️⭐️⭐️⭐️";
        break;
      case 9:
        return "⭐️⭐️⭐️⭐️⭐️";
        break;
      case 10:
        return "⭐️⭐️⭐️⭐️";
        break;

      default:
        return "Not Rated";
    }
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

  const classes = useStyles();
  return (
    <div className="outer_search">
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
            onClick={() => history.push(`/product/${foundprod._id}`)}
          >
            <div className="child_search">
              <div
                className="child"
                onClick={() => history.push(`/product/${foundprod._id}`)}
              >
                <CardMedia
                  className={classes.cover}
                  image={
                    "https://gamerstopbymarcrove.herokuapp.com/" +
                    foundprod.image.split("/")[1]
                  }
                  title="Live from space album cover"
                />
              </div>
              <div className="child_temp">
                <div className="child_elements child">{foundprod.name} </div>
                <div className="child_elements child">
                  {"     " + "₹" + foundprod.price}
                </div>
                <div className="child_elements child">
                  {findRating(foundprod.rating)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
