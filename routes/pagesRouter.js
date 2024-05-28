const pagesRouter = require('express').Router();
const { sendIndex, sendDashboard } = require('../controllers/auth.js');

pagesRouter.get('/', sendIndex);
pagesRouter.get('/admin/**', sendDashboard);

module.exports = pagesRouter;
