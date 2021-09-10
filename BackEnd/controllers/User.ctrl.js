const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const username = req.body.username;
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

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM Users WHERE username = ? ",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!username || !password) {
        return res.json({
          message: "Merci de bien complèter les champs de connexion",
        });
      }
      if (results.length > 0) {
        if (bcrypt.compare(password, results[0].password)) {
          const token = jwt.sign(
            {
              userId: results[0].id,
              username: results[0].username,
              firstname: results[0].firstname,
              lastname: results[0].lastname,
              isAdmin: results[0].isAdmin,
            },

            process.env.SECRET_TOKEN,

            { expiresIn: "2h" }
          );
          res
            .cookie("token", token, { httpOnly: true, maxAge: 900000 })
            //.send();
            .json({
              auth: true,
              loggedIn: true,
              username: username,
              id: results[0].id,
              userId: results[0].id,
              isAdmin: results[0].isAdmin,
              token: token,
            })
            .send();
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

exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
};

exports.loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;

    console.log(req.cookies, req.cookies.token)

    if (!token) return res.send(false);

    jwt.verify(token, process.env.SECRET_TOKEN);

    res.send(true);
  } catch (err) {
    res.send(false);
  }
};

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
