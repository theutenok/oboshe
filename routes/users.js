const usersRouter = require('express').Router();

const { checkAuth } = require('../middlewares/auth.js');

const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  hashPassword,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
} = require('../middlewares/users');
const {
  sendUserCreated,
  sendAllUsers,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require('../controllers/users');

usersRouter.post(
  '/users',
  checkEmptyNameAndEmailAndPassword,
  findAllUsers,
  checkIsUserExists,
  hashPassword,
  createUser,
  sendUserCreated,
);
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.put(
  '/users/:id',
  checkAuth,
  checkEmptyNameAndEmail,
  findAllUsers,
  checkIsUserExists,
  updateUser,
  sendUserUpdated,
);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);
usersRouter.get('/me', checkAuth, sendMe);

module.exports = usersRouter;
