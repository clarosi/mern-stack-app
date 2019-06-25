const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { UNAUTHORIZED_CODE } = require('../../shared/utils/status-code');
const { errObj } = require('../../shared/utils/helper');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');
  // if not in header get the token in query string
  if (!token) token = req.query.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(UNAUTHORIZED_CODE)
        .json(errObj('invalid or no token supplied.'));

    User.findById(decoded._id)
      .select('-password')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.status(UNAUTHORIZED_CODE).json(errObj(err)));
  });
};
