const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  next();
};

module.exports = { checkAuth };
