const db = require("../config/db");

exports.createPost = (req, res) => {
  const image = req.body.image;
  const { title, description, author } = req.body;

  let imageUrl = "";
  if (req.file) {
    const { destination, filename } = req.file;
    // imageUrl = req.file.path.replace("_temp", "");
    imageUrl = destination + "/" + filename.replace("_temp", "");
  }

  db.query(
    "INSERT INTO post (title, description, image, userid) VALUES (?, ?, ?, ?);",
    [title, description, imageUrl, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
};

/*
SELECT p.*, u.firstname, u.lastname, COUNT(lp.postId) AS nbLikes, EXISTS(SELECT lp.postId
FROM socialmedia.likes lp
WHERE lp.userId = 1
AND p.id = lp.postId) AS isLiked
FROM socialmedia.post p
INNER JOIN socialmedia.users u ON p.userid = u.id
LEFT JOIN socialmedia.likes lp ON p.id = lp.postId
GROUP BY p.id;
*/

exports.readPosts = (req, res) => {
  db.query(
    `
    SELECT p.*, u.firstname, u.lastname, COUNT(lp.postId) AS nbLikes, EXISTS(
      SELECT lp.postId
      FROM socialmedia.likes l
      WHERE l.userId = 1
      AND l.postId = p.id) AS isLiked
    FROM socialmedia.post p
      INNER JOIN socialmedia.users u ON p.userid = u.id
      LEFT JOIN socialmedia.likes lp ON p.id = lp.postId
    GROUP BY p.id;`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
};

exports.likePost = (req, res) => {
  const { userId, postId, like } = req.body;

  let query = "";
  if (like) {
    query = "INSERT INTO Likes (userId, postId) VALUES (?,?)";
  } else {
    query = "DELETE FROM Likes WHERE userId = ? AND postId = ?";
  }
  db.query(query, [userId, postId], (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ result: "ok" });
  });
};

exports.getComments = (req, res) => {
  const postId = req.params.id;

  db.query(
    `SELECT c.*, concat(u.firstname ," ", u.lastname)  as author 
    from comments c
    INNER JOIN users u ON c.userid = u.id
     WHERE c.postId=?;`,
    [postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ results });
    }
  );
};

exports.sendComment = (req, res) => {
  const { userId, postId, comment } = req.body;

  db.query(
    "INSERT INTO comments (userId, postId,comment) VALUES (?,?,?)",
    [userId, postId, comment],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ result: "ok" });
    }
  );
};
