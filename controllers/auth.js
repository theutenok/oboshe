const path = require('node:path');
const jwt = require('jsonwebtoken');

const users = require('../models/user');

const { SECRET_KEY } = require('../config');

// Middleware to check if the user is an admin
const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Assuming the token contains the admin flag
    if (decoded && decoded.admin) {
      req.user = decoded;
      next();
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.redirect('/');
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  users
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id, admin: user.admin }, SECRET_KEY, {
        expiresIn: 3600,
      });
      return { user, token };
    })
    .then(({ user, token }) => {
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        jwt: token,
        admin: user.admin,
      });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
      const decoded = jwt.verify(req.cookies.jwt, SECRET_KEY);
      if (decoded.admin) {
        return res.redirect('/admin/dashboard');
      } else {
        return res.redirect('/');
      }
    } catch (err) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    }
  } else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
};

const sendDashboard = [requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
}];

module.exports = { sendIndex, sendDashboard, login };
