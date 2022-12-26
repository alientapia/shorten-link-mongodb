const jwt = require('jsonwebtoken');
const User = require('../users/model/User');
async function verifyToken(req, res, next) {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided',
      });
    }
    const { id } = jwt.verify(token, process.env.SECRET);

    const userFound = await User.findById({ _id: id });
    if (!userFound) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided',
      });
    }
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
