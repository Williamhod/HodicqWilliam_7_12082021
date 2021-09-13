const db = require("../config/db");

/*****************************************************
 **    Post elements creation / read and remove      *
 ****************************************************/

exports.createPost = (req, res) => {
  const image = req.body.image;
  const { title, description } = req.body;
  const { userId } = res.locals.user;

  let imageUrl = "";
  if (req.file) {
    const { destination, filename } = req.file;
    // imageUrl = req.file.path.replace("_temp", "");
    imageUrl = destination + "/" + filename.replace("_temp", "");
  }

  db.query(
    "INSERT INTO post (title, description, image, userid) VALUES (?, ?, ?, ?);",
    [title, description, imageUrl, userId],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
};

exports.readPosts = (req, res) => {
  const { userId } = res.locals.user;

  db.query(
    `
    SELECT p.*, u.firstname, u.lastname, COUNT(lp.postId) AS nbLikes, EXISTS(
      SELECT lp.postId
      FROM socialmedia.likes l
      WHERE l.userId = ?
      AND l.postId = p.id) AS isLiked
    FROM socialmedia.post p
      INNER JOIN socialmedia.users u ON p.userid = u.id
      LEFT JOIN socialmedia.likes lp ON p.id = lp.postId
    GROUP BY p.id
    ORDER by p.created_at desc`,
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
};

exports.removePost = (req, res) => {
  const postId = req.params.id;
  const isAdmin = res.locals.isAdmin;

  db.query("DELETE FROM posts WHERE posts.id = ?", postId, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ results });
  });
};

/*******************************************
 **    Likes element creation / remove      *
 *******************************************/

exports.likePost = (req, res) => {
  const { postId, like } = req.body;
  const { userId } = res.locals.user;

  if (!userId) return res.status(401).json({ errorMessage: "Non autorisé" });

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

/*****************************************************
 **    Comments elements creation /read/ remove      *
 *****************************************************/

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
  const { postId, comment } = req.body;
  const { userId } = res.locals.user;

  db.query(
    "INSERT INTO comments (userId, postId,comment) VALUES (?,?,?)",
    [userId, postId, comment],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ results: "ok" });
    }
  );
};

exports.removeComment = (req, res) => {
  const commentId = req.params.id;
  const isAdmin = res.locals.isAdmin;

  db.query(
    `DELETE FROM comments WHERE comments.id = ?`,
    commentId,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ results });
    }
  );
};
