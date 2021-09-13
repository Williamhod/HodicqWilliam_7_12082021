const jwt = require("jsonwebtoken");

/*module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
      //.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
*/

// module.exports = (req, res, next) => {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     res.send("user not authenticated ")
//   } else {
//     jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
//       if (err) {
//         res.json({auth:false, message:"you fail to authenticate"})
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     })
//   }
// };

exports.checkUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) res.locals.user = null;

    //check token to auth routes
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    const { iat, exp, ...user } = verified;
    res.locals.user = user;

    //after any request refresh timer cookie and token

    const newToken = jwt.sign(
      user,
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.cookie("token", newToken, { httpOnly: true, maxAge: 3600000 });
  } catch (err) {
    res.locals.user = null;
  }

  next();
};

exports.checkAuth = (req, res, next) => {
  // if we dont have locals.user that on is unauthorized 
  if (!res.locals.user)
    return res.status(401).json({ message: "Unauthorized" });

  next();
};
