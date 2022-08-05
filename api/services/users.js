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

async function generateAccessToken({username}) {
  const data = await getUserInfoFromUsername(username);
  if (data === null)
    return false;
  else
    return jwt.sign({
      username: data?.username,
      role: data?.role,
    }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
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

async function getUserInfoFromUsername(username) {
  return await User.findOne({
    username,
  }).exec();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  createUser,
  getUserInfoFromUsername,
}