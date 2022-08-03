const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const dotenv = require('dotenv');
dotenv.config();

// create a new user if user name does not exist
// otherwise, overwrite the existing user
async function createUser({
  username,
  role
}) {
  const query = {
    username,
  }
  const update = {
    username,
    role,
  }
  const options = {
    upsert: true,
    new: true,
    runValidators: true,
  };
  await User.findOneAndUpdate(query, update, options);
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  })
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  createUser,
}