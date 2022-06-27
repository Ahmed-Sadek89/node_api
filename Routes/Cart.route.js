const { Router } = require('express');
const router = Router();
const body_parser = require('body-parser');
const bodyParser = body_parser.urlencoded({extended: true});
const { 
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../Middlewares/VerifyToken.guard');
const {
    createCart,
    updateCartById,
    deleteCartById,
    deleteCartByUserId,
    getCartByUserId,
    getAllCarts
} = require('../Controllers/Cart.controller');

// MUST USER BE AN ADMIN TO MAKE THOSE REQUESTS
// CREATE
router.post(
    '/add', 
    verifyTokenAndAuthorization,
    bodyParser,
    createCart
)

// // UPDATE
router.put(
    '/update/:id', 
    verifyTokenAndAuthorization, 
    bodyParser,
    updateCartById
)

// DELETE ONE ITEM IN CART
router.delete(
    '/delete/:id', 
    verifyTokenAndAuthorization, 
    deleteCartById
)

// DELETE THE CART OF USER_ID
router.delete(
    '/delete/userID/:id', 
    verifyTokenAndAuthorization, 
    deleteCartByUserId
)

// // GET Cart
router.get(
    '/get/:id', 
    verifyTokenAndAuthorization,
    getCartByUserId
)

// // ADMIN USER WHO MAKE THIS REQUEST ONLY
// // GET ALL Cart
router.get(
    '/getAll', 
    verifyTokenAndAdmin,
    getAllCarts
)


module.exports = router