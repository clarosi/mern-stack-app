const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { UNAUTHORIZED_CODE, FORBIDDEN_CODE } = require('../../shared/numbers');
const {
  UNAUTHORIZED_ERR,
  UNAUTHORIZED_USR_ERR,
  FORBIDDEN_ERR
} = require('../../shared/strings');
const { errObj } = require('../../shared/utils');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');
  // if not in header get the token in query string
  if (!token) token = req.query.token;
  // bail no token
  if (token.length <= 20) return res.status(FORBIDDEN_CODE).json(errObj(FORBIDDEN_ERR));

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(UNAUTHORIZED_CODE).json(errObj(UNAUTHORIZED_ERR));

    User.findById(decoded._id)
      .select('-password')
      .then(user => {
        if (!user) throw UNAUTHORIZED_USR_ERR;
        req.user = { token, ...user._doc };
        next();
      })
      .catch(err => res.status(UNAUTHORIZED_CODE).json(errObj(err)));
  });
};
