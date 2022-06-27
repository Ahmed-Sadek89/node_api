const router = require("express").Router();
require('dotenv').config({ path: './.env' })
const body_parser = require("body-parser");
const bodyParser = body_parser.urlencoded({extended: true})
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)


router.post("/payment", bodyParser,  async (req, res) => {
  console.log(" route reached", req.body);
 
  try {
    const payment = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "USD",
      description: "Your Company Description",
      payment_method: req.body.id,
      confirm: true,
    });
    console.log('payment: ', payment);
    res.status(200).json({
      message: "Payment Successful",
      success: true,
      payment
    });
  } catch (error) {
    console.log("error ", error.message);
    res.status(500).json({
      message: "Payment Failed",
      success: false,
    });
  }
});

module.exports = router;