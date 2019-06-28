const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  BAD_REQ_CODE,
  SERVER_ERR_CODE,
  UNAUTHORIZED_CODE
} = require('../../shared/numbers/statusCode');
const {
  INVALID_CRE_ERR,
  EMAIL_EXISTS_ERR,
  UNAUTHORIZED_USR_ERR,
  REQUIRED_FIELDS_ERR
} = require('../../shared/strings');
const { errObj } = require('../../shared/utils');
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  const { _id, email, token } = req.user;
  User.findOne({_id, email})
    .select('-password')
    .then(user => {
      if (!user) throw UNAUTHORIZED_USR_ERR;
      res.json({ token, ...user._doc });
    })
    .catch(err => res.status(UNAUTHORIZED_CODE).json(errObj(err)));
};

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation, i suggest use express-validator package.
  if (!name || !email || !password)
    return res.status(BAD_REQ_CODE).json(errObj(REQUIRED_FIELDS_ERR));

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(BAD_REQ_CODE).json(errObj(EMAIL_EXISTS_ERR));

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
    return res.status(BAD_REQ_CODE).json(errObj(REQUIRED_FIELDS_ERR));

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res.status(UNAUTHORIZED_CODE).json(errObj(INVALID_CRE_ERR));

      bcrypt.compare(password, user.password).then(match => {
        if (!match)
          return res.status(UNAUTHORIZED_CODE).json(errObj(INVALID_CRE_ERR));

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
