const allowedCors = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://pindieofficial.nomoredomainswork.ru",
  "https://pindiebackendaniltitov.nomoredomainswork.ru",
  "https://pindieofficial.nomoredomainswork.ru",
  "http://pindiebackendaniltitov.nomoredomainswork.ru"
];

function cors(req, res, next) {
  const { origin } = req.headers;
  console.log("req.headers", req.headers);
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
  }
  next();
}

module.exports = cors;
