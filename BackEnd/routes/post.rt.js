const express = require("express");
const router = express.Router();

const ctrl = require('../controllers/Posts.ctrl');


const auth = require('../middleware/auth');


const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');
const jimp= require('../middleware/jimp-config');

router.get("/",auth, ctrl.readPosts);

// auth
router.post("/",auth, multer, ctrl.createPost);
router.post("/like",auth, ctrl.likePost);
router.post("/comment",auth, ctrl.sendComment);
router.get("/:id/comments",auth, ctrl.getComments);

module.exports = router;