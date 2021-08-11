const db = require("../config/db");

exports.createPost = (req, res) => {
  const image = req.body.image;
  const { title, description } = req.body;
  
  let imageUrl = '';
  if (req.file) {
    imageUrl = req.file.path.replace('_temp', '');
  }
  
    db.query(
      "INSERT INTO post (title, description, image) VALUES (?, ?, ?);",
      [title, description, imageUrl],
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
}

  exports.readPosts = (req, res) => {
    db.query("SELECT * FROM post", (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  }