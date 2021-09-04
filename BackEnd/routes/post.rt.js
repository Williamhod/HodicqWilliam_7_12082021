const express = require("express");
const router = express.Router();

const ctrl = require('../controllers/Posts.ctrl');


const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');
const jimp= require('../middleware/jimp-config');

router.get("/", ctrl.readPosts);

// auth
router.post("/", multer, ctrl.createPost);
router.post("/like", ctrl.likePost);
router.post("/comment", ctrl.sendComment);
router.get("/:id/comments", ctrl.getComments);

module.exports = router;