const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const connect_database = require("./config/database");
const multer = require("multer");

connect_database();

app.use(passport.initialize());
require("./config/default.json");

app.use(express.static("uploads"));
app.use(express.json({extended: false}));
app.use(cors());
app.use(express.json());

app.use("/api/log/", require("./route/Users"));
app.use("/api/product", require("./route/products"));

app.use("/api/pay", require("./route/Checkout"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`));
