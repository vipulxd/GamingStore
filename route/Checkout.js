const express = require("express");
const router = express.Router();

const {v4: uuidv4} = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IyivBSBevftQuaAjwtwRcSq9a1idsqf5UqyHM5uLJVFPNZ1mmijueVMzv746u4J7pEOFGHOkmkn9MTaYhkHm0Bh00tZvSONmc"
);

router.post("/checkout", async (req, res) => {
  let status;
  let {amount} = req.body;
  let {id} = req.body;
  try {
    const payments = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "Gamer's Stop Keep Gaming",
      payment_method: id,
      confirm: true,
    });

    status = "success";

    res.json({status});
  } catch (error) {
    status = "failure";
    const reason = error.code;
    res.json({status, reason});
  }
});

module.exports = router;
