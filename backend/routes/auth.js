const express = require("express");
const authControl = require("../controllers/authController");

const router = express.Router();

router.post('/register', authControl.register)
router.post('/login', authControl.login)
router.post('/logout', authControl.logout)

module.exports = router;