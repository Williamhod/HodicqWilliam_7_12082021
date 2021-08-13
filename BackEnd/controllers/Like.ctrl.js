const db = require("../config/db");

exports.likePost = (req, res, next) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;
  db.query(
    "INSERT INTO Likes (userLiking, postId) VALUES (?,?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
};

