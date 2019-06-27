const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  BAD_REQ_CODE,
  SERVER_ERR_CODE,
  UNAUTHORIZED_CODE
} = require('../../shared/utils/status-code');
const { errObj } = require('../../shared/utils/helper');
const User = require('../models/user');

const UNAUTH_ERROR = 'Invalid email or password.';

module.exports.getUser = (req, res) => {
  const { _id, token } = req.user;
  User.findById(_id)
    .select('-password')
    .then(user => {
      if (!user) throw 'Unauthorized user.';
      res.json({ token, ...user._doc });
    })
    .catch(err => res.status(UNAUTHORIZED_CODE).json(errObj(err)));
};

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation, i suggest use express-validator package.
  if (!name || !email || !password)
    return res
      .status(BAD_REQ_CODE)
      .json(errObj('Name, email, and password are required.'));

  User.findOne({ email })
    .then(user => {
      if (user)
        return res.status(BAD_REQ_CODE).json(errObj('Email already exists.'));

      const newUser = new User({ name, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const { _id, name, email } = user;

              // generate a token
              jwt.sign(
                { _id },
                process.env.SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                  if (err) throw err;

                  res.json({ token, _id, name, email });
                }
              );
            })
            .catch(err => err);
        });
      });
    })
    .catch(err => res.status(SERVER_ERR_CODE).json(errObj(err)));
};

module.exports.signin = (req, res) => {
  const { email, password } = req.body;

  // Simple validation, i suggest use express-validator package.
  if (!email || !password)
    return res
      .status(BAD_REQ_CODE)
      .json(errObj('Email and password are required.'));

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res.status(UNAUTHORIZED_CODE).json(errObj(UNAUTH_ERROR));

      bcrypt.compare(password, user.password).then(match => {
        if (!match)
          return res.status(UNAUTHORIZED_CODE).json(errObj(UNAUTH_ERROR));

        jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) throw err;

            const { _id, name, email } = user;
            res.json({ token, _id, name, email });
          }
        );
      });
    })
    .catch(err => res.status(SERVER_ERR_CODE).json(errObj(err)));
};
