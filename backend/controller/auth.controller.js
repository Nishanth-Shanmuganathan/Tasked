
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user')


exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
}

exports.settings = (req, res, next) => {
  const settings = req.body;
  User.findOneAndUpdate({ email: req.body.email }, settings)
    .then(response => {
      res.status(201).json({
        message: 'Settings Updated',
        data: settings
      })
    })
    .catch(err => {
      res.status(201).json({
        message: 'Settings not updated',
        error: err
      })
    })
}

exports.register = (req, res, next) => {
  let fetchedUser;
  if (req.body.password !== req.body.confirmPassword) {
    res.status(401).json({
      message: 'PASSWORD_MISMATCH'
    })
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      fetchedUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      })
      return fetchedUser.save()
    })
    .then(response => {
      const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, process.env.TOKEN_GENERATOR)
      res.status(201).json({
        message: 'User created..',
        data: response,
        token: token
      });
    })
    .catch(err => {
      res.status(401).json({
        message: 'EMAIL_ALREADY_EXISTS',
        error: err
      })
    })
}

exports.login = (req, res, next) => {

  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "AUTHENTICATION_DENIED"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "AUTHENTICATION_DENIED"
        })
      }
      const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, process.env.TOKEN_GENERATOR)
      res.status(200).json({
        message: 'Logged in successfully',
        token: token,
        data: fetchedUser

      })
    })
    .catch(err => {
      res.status(401).json({
        message: "AUTHENTICATION_DENIED"
      })
    })
}

