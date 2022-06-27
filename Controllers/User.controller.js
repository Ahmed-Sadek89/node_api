const User = require('../Models/User.model');
const CryptoJS = require('crypto-js');

const updateUserById = async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.HASH_PASSWORD_SENTENCE
        ).toString()
    }
    try{
        const getUserById = await User.findOne({_id: req.params.id})
        if ( getUserById ) {
            await User.updateOne(
                {_id: req.params.id},
                {
                    $set: req.body
                }
            )
            res.status(200).json({status: 200, message: 'user updated successfully'})
        } else {
            res.status(500).json({status: 500, message: 'user not found'})
        }
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const deleteUserById = async (req, res ) => {
    try {
        await User.deleteOne({_id: req.params.id})
        res.status(200).json({status: 200, message: 'user deleted successfully'})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        const {password, ...others} = user._doc
        res.status(200).json({status: 200, user: others})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getAllUsers = async (req, res) => {
    const query = req.query.newUsers
    try {
        const users = query === true 
            ? await User.find().sort({_id: -1}).limit(3) 
            : await User.find().sort({_id: -1})
        res.status(200).json({status: 200, user: users})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getUsersStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const users = await User.aggregate([
            {
                $match: {createdAt: {$gte: lastYear}}
            },
            {
                $project: { month: {$month: "$createdAt"}}
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json({status: 200, user: users})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}



module.exports = {
    updateUserById,
    deleteUserById,
    getUserById,
    getAllUsers,
    getUsersStats
}