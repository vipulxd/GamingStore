const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const connect_database = require("./config/database");
connect_database();

app.use(express.json({extended: false}));
app.use(cors());
app.use(express.json());
app.use("/api/product", require("./route/products"));
app.use("/api/user", require("./route/Users"));

const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`));
