const express = require("express");
const router = express.Router();

const ctrl = require('../controllers/Posts.ctrl');


// const auth= require('../middleware/auth');
const {checkAuth} = require('../middleware/auth');


const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');
const jimp= require('../middleware/jimp-config');


//get elements
router.get("/",checkAuth, ctrl.readPosts);
router.get("/:id/comments", checkAuth, ctrl.getComments);

//post elements
router.post("/",checkAuth, multer, ctrl.createPost);
router.post("/like",checkAuth, ctrl.likePost);
router.post("/comment",checkAuth, ctrl.sendComment);

//remove elements
router.delete("/delete", checkAuth, ctrl.removePost);
router.delete("/comment/delete",checkAuth, ctrl.removeComment);





module.exports = router;