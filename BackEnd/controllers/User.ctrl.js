const db = require("../config/db");

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
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

/*exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: mailCryptor(req.body.email),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //status 201 pour une création de ressource
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
*/

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
      if (results.length > 0) {
        if (password === results[0].password) {
          res.json({ loggedIn: true, username: username, id: results[0].id });
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

/*exports.login = (req, res, next) => {
    User.findOne({ email: mailCryptor(req.body.email) })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                //chaine de caractère ici très simple mais ne pro qui sera bien plus longue et complexe
                { expiresIn: '4h' }
                //le token n'est valable que durant 4h
              )
              
              *cette solution de token permet comme pour la creation de nouveau objet , 
              *si on realise un objet avec un user, il ne pourra etre modifier par un autre, 
              *ce user id encoder sera utilise justement pour appliquer le bon user id sur chaque objet
              
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
*/

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
