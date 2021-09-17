const db = require("../config/db");

const fs = require("fs");
const message = require("../utils/messages");

/*  ****************************************************
 **    Post elements creation / read and remove      *
 ****************************************************/

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  const { userId } = res.locals.user;

  
  let imageUrl = "";
  if (req.file) {
    const { destination, filename } = req.file;
    imageUrl = destination + "/" + filename;
  }

  db.query(
    "INSERT INTO post (title, description, image, userId) VALUES (?, ?, ?, ?);",
    [title, description, imageUrl, userId],
    (err, results) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }
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
      INNER JOIN socialmedia.users u ON p.userid = u.userId
      LEFT JOIN socialmedia.likes lp ON p.id = lp.postId
    GROUP BY p.id
    ORDER by p.created_at desc`,
    [userId],
    (err, results) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }
      res.send(results);
    }
  );
};

exports.removePost = (req, res) => {
  const { postId } = req.params;
  const { isAdmin, userId } = res.locals.user;

  db.query(
    "SELECT userId, image FROM post WHERE id = ? ",
    postId,
    (err, post) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }
      if (isAdmin || post[0].userId === userId) {
        // Comments
        db.query(
          `DELETE FROM comments WHERE postId = ?`,
          postId,
          (err, _result) => {
            if (err) {
              message.showErrorSQL(err);
              return res.status(400).json({ errorMessage: "Erreur SQL" });
            }
            // post
            db.query(`DELETE FROM post WHERE id = ?`, postId, (err, _res) => {
              if (err) message.showErrorSQL(res, err);
              //likes
              db.query(
                "DELETE FROM likes WHERE postId = ?",
                postId,
                (err, _result) => {
                  if (err) {
                    message.showErrorSQL(err);
                    return res.status(400).json({ errorMessage: "Erreur SQL" });
                  } else {
                    //Image
                    if (post[0].image.length > 0) {
                      fs.unlinkSync(post[0].image);
                    }
                    res.status(200).json({ message: "Post supprimé" });
                  }
                }
              );
            });
          }
        );
      } else {
        res.status(401).json({ errorMessage: "Non autorisé" });
      }
    }
  );
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
      message.showErrorSQL(err);
      return res.status(400).json({ errorMessage: "Erreur SQL" });
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
    INNER JOIN users u ON c.userid = u.userId
     WHERE c.postId=?;`,
    [postId],
    (err, results) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
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
    (err, _res) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }
      res.status(200).json({ results: "ok" });
    }
  );
};

exports.removeComment = (req, res) => {
  const { commentId } = req.params;
  const { isAdmin, userId } = res.locals.user;

  db.query(
    "SELECT userId FROM comments WHERE commentId = ? ",
    commentId,
    (err, results) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }
      if (isAdmin || results[0].userId === userId) {
        db.query(
          `DELETE FROM comments WHERE commentId = ?`,
          commentId,
          (err, _results) => {
            if (err) {
              message.showErrorSQL(err);
              return res.status(400).json({ errorMessage: "Erreur SQL" });
            }
            res.status(200).json({ message: "Commentaire supprimé" });
          }
        );
      } else {
        res.status(401).json({ errorMessage: "Non autorisé" });
      }
    }
  );
};
