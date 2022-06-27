const stripe = require('stripe')('bearer sk_test_51L736ME3s8qpCTylRvrgeTXBsdqMJuhjijH0YGANbGefKfBAiLo2t2lfeA8JT5a1qMxK2C3VbVVT4y0u0lHtbfsV00JuenU65w')

const paymentController = (req, res) => {
     stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                console.log(stripeErr.message);
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
          }
      );
}

module.exports = {
    paymentController
}