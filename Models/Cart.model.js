const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: [true, 'missing user id'] 
    },
    cart: {
      // product info
      productId: {
        type: String,
        required: [true, 'missing product id'] 
      },
      title: {
        type: String,
        required: [true, 'missing product title'] 
      },
      image: {
        type: String,
        required: [true, 'missing product image'] 
      },
      price: {
        type: Number,
        required: [true, 'missing product price']
      },
      // user info
      color: {
        type: String,
        required: [true, 'missing product color']
      },
      size: {
        type: String,
        required: [true, 'missing product size']
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, 'minimum value is 1']
      },
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart