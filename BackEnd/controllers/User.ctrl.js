const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");
/*****************
 **    Register  *
 *****************/

exports.signup = async (req, res) => {
  const username = req.body.username;
  console.log(
    "passeword dans l attente d un verify passeword",
    req.body.password
  );
  const password = await bcrypt.hash(req.body.password, 10);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const avatar = "null";
  const isAdmin = 0;
  const dateOfBirth = "0000-00-00";

  db.query(
    "INSERT INTO users (username,password,firstname,lastname,avatar,isAdmin,dateOfBirth) VALUES (?,?,?,?,?,?,?);",
    [username, password, firstname, lastname, avatar, isAdmin, dateOfBirth],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
};

/**************
 **   Login   *
 *************/

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Users WHERE username = ? ",
    username,
    async (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!username || !password) {
        return res.json({
          message: "Merci de bien complèter les champs de connexion",
        });
      }
      if (results.length > 0) {
        const verif = await bcrypt.compare(password, results[0].password);
        if (verif) {
          const token = jwt.sign(
            {
              userId: results[0].userId,
              username: results[0].username,
              firstname: results[0].firstname,
              lastname: results[0].lastname,
              isAdmin: results[0].isAdmin,
            },

            process.env.SECRET_TOKEN,

            { expiresIn: "1h" }
          );
          //Set up token and cookie that can be change from browser and up to 1h
          res
            .cookie("token", token, { httpOnly: true, maxAge: 3600000 })
            .send();
        } else {
          res.json({
            loggedIn: false,
            message: "Les valeurs identifiants et mots de passe sont erronées",
          });
        }
      } else {
        res.json({ loggedIn: false, message: "Merci de bien verifier les champs de l'identifiant et du mot de passe" });
      }
    }
  );
};

/*********************
 **    Disconnection *
 *********************/

// For DC we remove content in cookie then change date to past
exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
};

/******************************
 **   log statement for front *
 ******************************/
//Send loggedIn statement to true or false to realise a front context

exports.loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    const defaultState = { loggedIn: false };

    if (!token) return res.send(defaultState);

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { iat, exp, ...user } = decodedToken;

    res.send({ loggedIn: true, user });
  } catch (err) {
    res.send(defaultState);
  }
};

/********************************
 **  Profil -- work in progress *
 *******************************/

exports.userProfil = (req, res) => {
  const username = req.params.username;
  console.log("user", username);
  db.query(
    "SELECT * From users Where username = ?",
    username,
    (err, results) => {
      if (err) {
        // console.log(err);
        res.status(404).json({ err: "Not found" });
      }
      res.status(200).json(results[0]);
    }
  );
};

/*******************************************
 **  Account -- remove all data about user *
 ******************************************/
exports.removeAccount = (req, res) => {
  const { userId } = res.locals.user;
  console.log("user", userId);

  db.query(
    "SELECT  image FROM post WHERE userId = ? ",
    userId,
    (err, posts) => {
      if (err) {
        message.showErrorSQL(err);
        return res.status(400).json({ errorMessage: "Erreur SQL" });
      }

      // Comments
      db.query(
        `DELETE FROM comments WHERE userId = ?`,
        userId,
        (err, _result) => {
          if (err) {
            message.showErrorSQL(err);
            return res.status(400).json({ errorMessage: "Erreur SQL" });
          }
          // Posts
          db.query(`DELETE FROM post WHERE userId = ?`, userId, (err, _res) => {
            if (err) {
              message.showErrorSQL(err);
              return res.status(400).json({ errorMessage: "Erreur SQL" });
            }
            //likes
            db.query(
              "DELETE FROM likes WHERE userId = ?",
              userId,
              (err, _result) => {
                if (err) {
                  message.showErrorSQL(err);
                  return res.status(400).json({ errorMessage: "Erreur SQL" });
                }

                //account
                db.query(
                  "DELETE FROM users WHERE userId = ?",
                  // "SELECT * FROM users WHERE userId = ?",
                  userId,
                  (err, _result) => {
                    if (err) {
                      message.showErrorSQL(err);
                      return res
                        .status(400)
                        .json({ errorMessage: "Erreur SQL" });
                    } else {
                      //Image
                      console.log("post", posts);
                      posts.forEach((post) => {
                        if (fs.existsSync(post.image)) {
                          fs.unlinkSync(post.image);
                        }
                      });

                      // res.status(200).json({ message: "Compte supprimé" });
                      this.logout(req, res);
                    }
                  }
                );
              }
            );
          });
        }
      );
    }
  );
};
