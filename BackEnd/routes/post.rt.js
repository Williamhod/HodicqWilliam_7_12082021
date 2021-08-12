const express = require("express");
const router = express.Router();
// const fs = require('fs');
// const db = require("../config/db");
const ctrl = require('../controllers/Posts.ctrl');


const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');

router.get("/", ctrl.readPosts);

// auth
router.post("/", multer, sharp, ctrl.createPost);

module.exports = router;