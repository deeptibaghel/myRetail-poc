'user strict';

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('./app/helpers/jwt');
const errorHandler = require('./app/helpers/error-handler');

const options = {
  key: fs.readFileSync(__dirname + '/localhost.key'),
  cert: fs.readFileSync(__dirname + '/localhost.crt')
};

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// define a simple route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to myRetail products management API"});
});

// Require routes
require('./app/routes/route.js')(app);

const env = process.env.NODE_ENV || 'test';

//listen for requests
const port = env === 'production' ? 443 : 3000 ;

module.exports = https.createServer(options, app).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


if(env === 'test') {
  module.exports = http.createServer(app).listen(8080, () => {
    console.log(`Server is listening on port 8080`);
  });
}


