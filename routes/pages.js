const pagesRouter = require("express").Router();
const { sendIndex, sendDashboard } = require("../controllers/auth");
const { checkAuth, checkCookies } = require("../middlewares/auth");
pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkCookies, checkAuth, sendDashboard);

module.exports = pagesRouter;
