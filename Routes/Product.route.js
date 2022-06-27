const { Router } = require('express');
const router = Router();
const body_parser = require('body-parser');
const bodyParser = body_parser.urlencoded({extended: true});
const { 
    verifyTokenAndAdmin 
} = require('../Middlewares/VerifyToken.guard');
const {
    createProduct,
    updateProductById,
    deleteProductById,
    getProductById,
    getAllProducts
} = require('../Controllers/Product.controller');

// MUST USER BE AN ADMIN TO MAKE THOSE REQUESTS
// CREATE
router.post(
    '/add', 
    verifyTokenAndAdmin, 
    bodyParser,
    createProduct
)

// UPDATE
router.put(
    '/update/:id', 
    verifyTokenAndAdmin, 
    bodyParser,
    updateProductById
)

// DELETE
router.delete(
    '/delete/:id', 
    verifyTokenAndAdmin, 
    deleteProductById
)

// ANY USER CAN MAKE THOSE REQUESTS
// GET Product
router.get(
    '/get/:id', 
    getProductById
)

// GET ALL Product
router.get(
    '/getAll', 
    getAllProducts
)


module.exports = router