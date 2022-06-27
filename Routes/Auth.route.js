const { Router } = require('express');
const router = Router();
const body_parser = require('body-parser');
const bodyParser = body_parser.urlencoded({extended: true});

const {
    authSignupController, authLoginController
} = require('../Controllers/Auth.controller')

router.post('/signup', bodyParser, authSignupController)
router.post('/login', bodyParser, authLoginController)

module.exports = router