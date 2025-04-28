const UserController = require('../Controllers/User.controller');

const router = require('express').Router();

router.post("/signup",UserController.signup)

router.post("/login",UserController.login)

module.exports = router;