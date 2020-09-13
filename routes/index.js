var express = require("express");
var router = express.Router();
const stripe = require("stripe")(
  "sk_test_51HQ4qtHt0wcdFhOshSiHumZlOPea7uSYDiuJCMD7yniLdg6cEROOnymZvwEDPfvXW9rR6kDbgmuk9bStlnOIVexZ00T8MNtDOE"
);

/* GET home page. */
router.get("/", (request, response, next) => {
  response.status(200).send("hello world");
  next();
});

router.post("/payments/create", async (request, response, next) => {
  try {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "inr",
    });
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
