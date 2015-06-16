var express = require('express');
var app = express();

// Middleware for redirecting http to https
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.use(express.static('dist'));

app.listen(process.env.PORT || 9000);
console.log("Starting server...");
