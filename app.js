// required dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cors = require('cors');

// required routes
const authRoutes = require('./Routes/Auth.route'); 
const userRoutes = require('./Routes/User.route'); 
const productRoutes = require('./Routes/Product.route'); 
const cartRoutes = require('./Routes/Cart.route'); 
const orderRoutes = require('./Routes/Order.route'); 
const paymentRoutes = require('./Routes/Payment.route'); 

// settings
dotEnv.config();
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('Public'));
    app.get('/', (req, res) => {
        res.sendFile(__dirname+'/Public/index.html')
    })
} else {
    app.get('/', (req, res) => {
        res.send('NODE_ENV !== production')
    })
}

// server & DB connections
mongoose.connect(process.env.DB_URL)
.then(() => {
    const port = process.env.PORT | 4000;
    app.listen(port, () => console.log('server is worked on port ' + port))
})
.catch((error) => {
    console.log(error);
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', paymentRoutes)


// start STRIPE