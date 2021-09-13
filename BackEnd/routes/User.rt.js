const express = require("express");
const router = express.Router();
const verifyPassword = require("../middleware/checkPassWord");

const user = require("../controllers/User.ctrl");

//register function
router.post("/register", verifyPassword, user.signup);

//login function
router.post("/login", user.login);

// front log statement function
router.get("/loggedIn", user.loggedIn);

//dc function
router.get("/logout", user.logout);

//get user account info futur next step
router.get("/profile/:username", user.userProfil);

module.exports = router;
