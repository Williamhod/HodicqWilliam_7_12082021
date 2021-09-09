const jwt = require('jsonwebtoken');

/*module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
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

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("user not authenticated ")
  } else {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.json({auth:false, message:"you fail to authenticate"})
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
  
};