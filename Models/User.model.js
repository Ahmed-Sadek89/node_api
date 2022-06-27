const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { isEmail, isEmpty } = require('validator')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'first name is required'],
            
        },
        lastName: {
            type: String,
            required: [true, 'last name is required'],
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: [true, 'username must be unique'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: [true, 'email must be unique'],
            validate: [ isEmail, 'invalid email']
        },
        password: {
            type: String
        },
        confirmPassword: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.checkLogin = async function(email, password) {
    const user = await User.findOne({email});

    if (!user) {
        throw Error('email is not found')
    } else {
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.HASH_PASSWORD_SENTENCE
        ).toString(CryptoJS.enc.Utf8)
        
        if( hashedPassword !== password ) { 
            throw Error('invalid password')
        } else {
            return user
        }
    }
}


userSchema.pre("save", function (next) { 

    const hashedPassword = CryptoJS.AES.decrypt(
        this.password,
        process.env.HASH_PASSWORD_SENTENCE
    ).toString(CryptoJS.enc.Utf8);

    const hashedConfirmPassword = CryptoJS.AES.decrypt(
        this.confirmPassword,
        process.env.HASH_PASSWORD_SENTENCE
    ).toString(CryptoJS.enc.Utf8)

    if( hashedPassword !== hashedConfirmPassword ) {
        throw Error('those passwords are not same')
    } else {
        if ( hashedPassword.length <= 4 || hashedConfirmPassword.length <= 4 ){
            throw Error('password must be min 4 characters')
        }else { 
            next()
        }
        
     }
 })

const User = mongoose.model('user', userSchema);

module.exports = User