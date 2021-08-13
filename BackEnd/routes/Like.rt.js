const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/Like.ctrl");

router.post("/", likeCtrl.likePost);

module.exports = router;
