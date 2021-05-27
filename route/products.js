const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const User_Schema = require("../model/user.js");
const Prod_Schema = require("../model/product.js");

// Route to create product
router.post(
  "/add_prod/:user_id",
  [
    check("name", "required").notEmpty(),
    check("rating", "required").notEmpty(),
    check("quantity", "required").notEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error) {
      res.json({message: "Error"});
    }
    if (req.params.user_id == "vipul.xtr@gmail.com") {
      try {
        const pack = new Prod_Schema({
          name: req.body.name,
          rating: req.body.rating,
          quantity: req.body.rating,
        });
        await pack.save();
        res.json({message: "Product created"});
      } catch (err) {
        res.json({message: error});
      }
    } else {
      res.json({message: "You are not the admin"});
    }
  }
);

//Route to get all products
router.get("/", async (req, res) => {
  Prod_Schema.find({}, function (err, result) {
    if (err) {
    } else {
      res.send(result);
    }
  });
});

// Route to  get Products in Cart
router.get("/:user_id", async (req, res) => {
  try {
    const prod = await User_Schema.findOne({_user_id: req.params.user_id});
    res.send(prod.products);
  } catch (err) {
    res.json({message: "Login to save items to cart"});
  }
});

// Route to add products to Cart
router.put(
  "/:user_id",
  [check("products", "required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({message: "Please add some product  to  cart "});
    }
    try {
      const prod = await User_Schema.findOne({_user_id: req.params.user_id});

      const product_id = req.body.products;

      prod.products.unshift({prod_id: product_id});

      await prod.save();
      res.json({message: "Cart updated"});
    } catch (error) {
      res.json({message: "Login to add products to cart"});
    }
  }
);

module.exports = router;
