const jwt = require("jsonwebtoken");

/*************************************
 **  Authentification controller     *
 ************************************/

exports.checkUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) res.locals.user = null;

    //check token for any posts routes request
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    const { iat, exp, ...user } = verified;
    res.locals.user = user;

    //after any request refresh timer cookie and token

    const newToken = jwt.sign(user, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.cookie("token", newToken, { httpOnly: true, maxAge: 3600000 });
  } catch (err) {
    res.locals.user = null;
  }

  next();
};

exports.checkAuth = (req, res, next) => {
  // if we dont have locals.user that mean didnt get the check user controller so is unauthorized
  if (!res.locals.user)
    return res.status(401).json({ message: "Unauthorized" });

  next();
};
