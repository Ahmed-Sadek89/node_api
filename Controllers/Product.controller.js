const Product = require('../Models/Product.model');


const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product(req.body);
        await newProduct.save();
        res.status(200).json({status: 200, newProduct})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const updateProductById = async (req, res) => {
    try{
        const getProductById = await Product.findOne({_id: req.params.id})
        if ( getProductById ) {
            await Product.updateOne(
                {_id: req.params.id},
                {
                    $set: req.body
                }
            )
            res.status(200).json({status: 200, message: 'Product updated successfully'})
        } else {
            res.status(500).json({status: 500, message: 'Product not found'})
        }
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const deleteProductById = async (req, res ) => {
    try {
        await Product.deleteOne({_id: req.params.id})
        res.status(200).json({status: 200, message: 'Product deleted successfully'})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        res.status(200).json({status: 200, product})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getAllProducts = async (req, res) => {
    const newProducts = req.query.newProducts;
    const categories = req.query.categories;
    try {
        let products;
        if (newProducts) {
            products = await Product.find().sort({_id: -1}).limit(1) 
        } else if(categories) {
            products = await Product.find({
                categories: 
                    { $in: [categories] } 
            }).sort({_id: -1})
        } else {
            products = await Product.find().sort({createdAt: -1})
        }
        res.status(200).json({
            status: 200, 
            categories: categories ? categories: null, 
            count: products.length, 
            products
        })
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}




module.exports = {
    createProduct,
    updateProductById,
    deleteProductById,
    getProductById,
    getAllProducts
}