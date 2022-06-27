const { Router } = require('express');
const router = Router();
const body_parser = require('body-parser');
const bodyParser = body_parser.urlencoded({extended: true});
const { 
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../Middlewares/VerifyToken.guard');
const {
    createOrder,
    updateOrderById,
    deleteOrderById,
    getOrderByUserId,
    getAllOrders,
    getMonthlyIncome
} = require('../Controllers/Order.controller');

// CREATE
router.post(
    '/add', 
    verifyTokenAndAuthorization, 
    bodyParser,
    createOrder
)

// UPDATE
router.put(
    '/update/:id', 
    verifyTokenAndAdmin, 
    bodyParser,
    updateOrderById
)

// DELETE
router.delete(
    '/delete/:id', 
    verifyTokenAndAdmin, 
    deleteOrderById
)

// // GET Order
router.get(
    '/get/:id', 
    verifyTokenAndAuthorization,
    getOrderByUserId
)

// // GET ALL Order
router.get(
    '/getAll', 
    verifyTokenAndAdmin,
    getAllOrders
)

// GET MONTHLY INCOME FRO ORDERS
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome) 


module.exports = router