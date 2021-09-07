const express = require("express");
const router = express.Router();
const verifyPassword = require('../middleware/checkPassWord');


const user = require ("../controllers/User.ctrl")

router.post("/register",verifyPassword, user.signup);
router.post("/login", user.login);

router.get("/profile/:username", user.userProfil);

module.exports = router;
