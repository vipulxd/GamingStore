const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const User_Schema = require("../model/user.js");

//Route to add user

router.post("/:user_id", [check("_user_id", "required")], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({message: "Unable to execute the request"});
  }
  try {
    const user = new User_Schema({
      _user_id: req.params.user_id,
    });
    user.save();
    res.json({message: "Hey you are logged"});
  } catch (err) {
    res.send(500).send("server error");
  }
});

module.exports = router;
