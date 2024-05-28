const authRouter = require('express').Router();

const { login } = require('../controllers/auth.js');
// const { checkAuth } = require("../middlewares/auth.js");

authRouter.post('/auth/login', login);
// authRouter.get("/auth/me", checkAuth, sendMe);

module.exports = authRouter;
