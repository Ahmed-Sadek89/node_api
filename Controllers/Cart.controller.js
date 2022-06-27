const Cart = require('../Models/Cart.model');


const cartErrors = (e) => {
    const AllErrors = {}
    if(e.message.includes('cart validation failed')){
        Object.values(e.errors)
        .forEach(err => {
            const props = err.properties.path.split('.')[1]
            AllErrors[props] = err.properties.message
        })
    }
    return AllErrors
}

const createCart = async (req, res) => {
    try {
        const newCart = await new Cart(req.body);
        await newCart.save();
        res.status(200).json({status: 200, newCart})
    } catch(error) {
        const errors = cartErrors(error)
        res.status(500).json({status: 500, errors})
    }
}

const updateCartById = async (req, res) => {
    try{
        const getCartById = await Cart.findOne({_id: req.params.id})
        if ( getCartById ) {
            await Cart.updateOne(
                {_id: req.params.id},
                {
                    $set: req.body
                }
            )
            console.log(req.body)
            res.status(200).json({status: 200, message: 'Cart updated successfully'})
        } else {
            res.status(500).json({status: 500, message: 'Cart not found'})
        }
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const deleteCartById = async (req, res ) => {
    try {
        await Cart.deleteOne({_id: req.params.id})
        res.status(200).json({status: 200, message: 'Cart deleted successfully'})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const deleteCartByUserId = async (req, res ) => {
    try {
        await Cart.deleteMany({userId: req.params.id})
        res.status(200).json({status: 200, message: 'Cart of user is deleted successfully'})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.id})
        res.status(200).json({status: 200, count: cart.length, cart})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getAllCarts = async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json({status: 200, count: cart.length, cart})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}


module.exports = {
    createCart,
    updateCartById,
    deleteCartById,
    deleteCartByUserId,
    getCartByUserId,
    getAllCarts
}