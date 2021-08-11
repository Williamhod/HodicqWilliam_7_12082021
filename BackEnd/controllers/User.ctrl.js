const db = require("../config/db");

exports.signup = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
      "INSERT INTO users (username,password) VALUES (?,?);",
      [username, password],
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
  };

  exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM Users WHERE username = ?",
      username,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.length > 0) {
          if (password == results[0].password) {
            res.json({ loggedIn: true, username: username });
          } else {
            res.json({
              loggedIn: false,
              message: "Wrong username/password combo!",
            });
          }
        } else {
          res.json({ loggedIn: false, message: "User doesn't exist" });
        }
      }
    );
  };