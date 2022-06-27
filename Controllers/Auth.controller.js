const User = require('../Models/User.model')
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

const createToken = (user) => {
    return JWT.sign({
        id: user._id,
        isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: '3d'
    }
    )
}

const handleSignupErrors = (e) => {
    console.log(e);
    console.log(e.code);
    console.log(e.message);
    const AllErrors = {}

    // unique errors
    if(e.code === 11000) {
        for( let i in e.keyPattern) {
            AllErrors[i] = `${i} must be unique`
        }
    }

    // password errors
    if(e.message === 'password must be min 4 characters') {
        AllErrors['password'] = 'password must be min 4 characters'
        AllErrors['confirmPassword'] = 'password must be min 4 characters'
    }
    if(e.message === 'those passwords are not same') {
        AllErrors['password'] = 'those passwords are not same'
        AllErrors['confirmPassword'] = 'those passwords are not same'
    }

    // validation errors
    if(e.message.includes('user validation failed')){
        Object.values(e.errors)
        .forEach(err => {
            AllErrors[err.properties.path] = err.properties.message
        })
    }

    return AllErrors
}

const authSignupController = async ( req, res ) => {
    const {firstName, lastName, username, email,} = req.body
    try {
        const newUser = await new User({
            firstName, lastName, username, email, 
            password: await CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.HASH_PASSWORD_SENTENCE
            ).toString(),
            confirmPassword: await CryptoJS.AES.encrypt(
                req.body.confirmPassword, 
                process.env.HASH_PASSWORD_SENTENCE
            ).toString()
        })

        await newUser.save()

        const { password, confirmPassword, ...others } = newUser._doc
        
        res.status(200).json({status: 200, newUser: others})
    }
    catch(error) {
        const errors = handleSignupErrors(error)
        res.status(500).json({status: 500, errors})
    }
}

const authLoginController = async ( req, res ) => {
    const { email } = req.body
    try {
        let checkUser = await User.checkLogin(email, req.body.password)
        const {password, confirmPassword, ...others } = checkUser._doc;
        const token = createToken(checkUser);
        res.status(200).json({status: 200, user: others, token})
    }
    catch(error) {
        res.status(500).json({status: 500, error: error.message})
    }
}

module.exports = {
    authSignupController, 
    authLoginController
}