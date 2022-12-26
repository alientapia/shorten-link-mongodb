const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided',
      });
    }
    const { id } = jwt.verify(token, process.env.SECRET);
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: error.message,
    });
  }
}

module.exports = { verifyToken };
