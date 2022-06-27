const Order = require('../Models/Order.model');


const createOrder = async (req, res) => {
    try {
        const newOrder = await new Order(req.body);
        await newOrder.save();
        const {_id, ...others} = newOrder._doc
        res.status(200).json({status: 200, newOrder: others})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const updateOrderById = async (req, res) => {
    try{
        const getOrderById = await Order.findOne({_id: req.params.id})
        if ( getOrderById ) {
            await Order.updateOne(
                {_id: req.params.id},
                {
                    $set: req.body
                }
            )
            res.status(200).json({status: 200, message: 'Order updated successfully'})
        } else {
            res.status(500).json({status: 500, message: 'Order not found'})
        }
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const deleteOrderById = async (req, res ) => {
    try {
        await Order.deleteOne({_id: req.params.id})
        res.status(200).json({status: 200, message: 'Order deleted successfully'})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getOrderByUserId = async (req, res) => {
    try {
        const order = await Order.findOne({userId: req.params.id})
        res.status(200).json({status: 200, order})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find()
        res.status(200).json({status: 200, count: order.length, order})
    } catch(error) {
        res.status(500).json({status: 500, message: error.message})
    }
}

const getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  }


module.exports = {
    createOrder,
    updateOrderById,
    deleteOrderById,
    getOrderByUserId,
    getAllOrders,
    getMonthlyIncome
}