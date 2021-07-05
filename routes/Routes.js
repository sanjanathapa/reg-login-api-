// Route.js
const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./user.js') // import account route
router.use(accountRoutes) // use account route


module.exports = router;