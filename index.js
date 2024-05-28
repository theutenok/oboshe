const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const { PORT } = require('./config');

const cors = require('cors');
const { excludeHTML } = require('./middlewares/static');
const { connectToDatabase } = require('./database/connect');

const { apiRouter, pagesRouter } = require('./routes');

const app = express();

connectToDatabase();

app.use(
  cors(),
  cookieParser(),
  express.json(),
  excludeHTML,
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, 'public')),
);

app.listen(PORT, () => {
  console.log(`App is runnning on: http://localhost:${PORT}`);
});
