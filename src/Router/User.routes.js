const UserController = require('../Controllers/User.controller');
const auth = require("../Middlewares/Auth.middleware")


const router = require('express').Router();

router.post("/signup",UserController.signup);

router.post("/login",UserController.login);

router.patch("/disable-user",auth({isTokenRequired:true,usersAllowed:["Admin"]}), UserController.disableUser);

module.exports = router;