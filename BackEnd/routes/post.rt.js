const express = require("express");
const router = express.Router();

const ctrl = require('../controllers/Posts.ctrl');


// const auth= require('../middleware/auth');
const {checkAuth} = require('../middleware/auth');


const multer = require('../middleware/multer-config');



//Posts
router.post("/",checkAuth, multer, ctrl.createPost);
router.get("/",checkAuth, ctrl.readPosts);
router.delete("/:postId", checkAuth, ctrl.removePost);

//Comments
router.get("/:id/comments", checkAuth, ctrl.getComments);
router.post("/comment",checkAuth, ctrl.sendComment);
router.delete("/comment/:commentId",checkAuth, ctrl.removeComment);

//Like
router.post("/like",checkAuth, ctrl.likePost);





module.exports = router;