const express = require("express");
const router = express.Router();
const verifyPassword = require("../middleware/checkPassWord");

const user = require("../controllers/User.ctrl");

const { checkAuth } = require("../middleware/auth");

// auth
router.post("/register", verifyPassword, user.signup);
router.post("/login", user.login);
router.get("/logout", user.logout);
router.delete("/delete", checkAuth, user.removeAccount);

// front Session statement function
router.get("/loggedIn", user.loggedIn);

// user
//get user account info futur next step
router.get("/profile/:username", user.userProfil);

module.exports = router;
