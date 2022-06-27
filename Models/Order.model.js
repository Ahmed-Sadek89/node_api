const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        title: {
          type: String,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
        },
        // user info
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order