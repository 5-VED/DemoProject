const {RoleController} = require('../Controllers');

const router = require('express').Router();

router.post("/add-role",RoleController.addRole)

module.exports = router;