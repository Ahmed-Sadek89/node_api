const { Router } = require('express');
const router = Router();
const body_parser = require('body-parser');
const bodyParser = body_parser.urlencoded({extended: true});
const { 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin 
} = require('../Middlewares/VerifyToken.guard');
const {
    updateUserById,
    deleteUserById,
    getUserById,
    getAllUsers,
    getUsersStats
} = require('../Controllers/User.controller');


// MUST USER BE AN AUTHORIZED TO MAKE THOSE REQUESTS
// UPDATE
router.put(
    '/update/:id', 
    verifyTokenAndAuthorization, 
    bodyParser,
    updateUserById
)

// DELETE
router.delete(
    '/delete/:id', 
    verifyTokenAndAuthorization, 
    deleteUserById
)


// MUST USER BE AN ADMIN TO MAKE THOSE REQUESTS
// GET USER
router.get(
    '/get/:id', 
    verifyTokenAndAdmin, 
    getUserById
)

// GET ALL USER
router.get(
    '/getAll', 
    verifyTokenAndAdmin, 
    getAllUsers
)

// GET USERS STATS
router.get(
    '/stats', 
    verifyTokenAndAdmin, 
    getUsersStats
)

module.exports = router