import {React, useState} from "react";
import Header from "../Header/index";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import "../../Styles/admin.css";
import {makeStyles} from "@material-ui/core";

function Admin() {
  const classes = makeStyles();
  const [game, setgame] = useState({
    name: "",
    price: "",
    rating: "",
    productImage: "",
  });

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", game.name);
    formData.append("rating", game.rating);
    formData.append("price", game.price);
    formData.append("productImage", game.productImage);

    axios
      .post(
        "https://gamerstopbymarcrove.herokuapp.com/api/product/add_prod/vipul.xtr@gmail.com",
        formData
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function onFileSubmit(e) {
    setgame({...game, productImage: e.target.files[0]});
  }
  const handleChange = e => {
    setgame({...game, [e.target.name]: e.target.value});
  };
  console.log(game);

  return (
    <div>
      <Header />
      <div className="main_outer">
        <div className="admin_space">
          <h4> Add Games</h4>
          <form
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Application Name"
              type="text"
              name="name"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              placeholder="Rating"
              type="text"
              name="rating"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              placeholder="Price"
              type="text"
              name="price"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              type="file"
              accept=".jpg,.jpeg"
              name="productImage"
              onChange={onFileSubmit}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Button variant="outlined" color="primary" type="submit">
              Add
            </Button>
          </form>
        </div>
        <div className="admin_space">
          <h4>Add Games</h4>
          <form
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Application Name"
              type="text"
              name="name"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              placeholder="Rating"
              type="text"
              name="rating"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              placeholder="Price"
              type="text"
              name="price"
              onChange={handleChange}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Input
              type="file"
              accept=".jpg,.jpeg"
              name="productImage"
              onChange={onFileSubmit}
              required
              inputProps={{"aria-label": "description"}}
            />
            <Button variant="outlined" color="primary" type="submit">
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
