const JWT = require('jsonwebtoken');

const verifyToken = ( req, res, next ) => {
    const tokenHeader = req.headers.token;
    if (tokenHeader) {
        const token = tokenHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET_KEY, async (error, user ) => {
            if (error) {
                //console.log(error);
                res.status(404).json({
                    status: 404,
                    tokenError: error.message //invalid token
                })
            } else {
                console.log(user);
                // user => contain all info that you sign to JWT in auth.controller(login)
                req.user = user
                next()
            }
        })
    } else {
        res.status(404).json({
            status: 404,
            tokenError: 'you are not authenticated'
        })
    }
}

const verifyTokenAndAuthorization = ( req, res, next ) => {
    verifyToken( req, res, () => {
        if ( req.user.id === req.params.id || req.user.isAdmin ) {
            next()
        } else {
            res.status(404).json({
                status: 404,
                tokenError: 'you are not authorized'
            })
        }
    })
}

const verifyTokenAndAdmin = ( req, res, next ) => {
    verifyToken( req, res, () => {
        if ( req.user.isAdmin === true ) {
            next()
        } else {
            res.status(404).json({
                status: 404,
                tokenError: 'you are not admin'
            })
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}