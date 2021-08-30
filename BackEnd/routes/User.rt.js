const express = require("express");
const router = express.Router();


const user = require ("../controllers/User.ctrl")

router.post("/register", user.signup);
router.post("/login", user.login);

router.get("/profile/:username", user.userProfil);

module.exports = router;
