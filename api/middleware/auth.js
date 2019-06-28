const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { UNAUTHORIZED_CODE } = require('../../shared/numbers');
const {
  UNAUTHORIZED_ERR,
  UNAUTHORIZED_USR_ERR
} = require('../../shared/strings');
const { errObj } = require('../../shared/utils');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');
  // if not in header get the token in query string
  if (!token) token = req.query.token;

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
