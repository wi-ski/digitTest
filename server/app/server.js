var morgan = require('morgan');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var jwtCheck = require('./config/middleware/jwtCheck.js');
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
// var io = require('socket.io')(server);
// var cookieParser = require('cookie-parser');

var OpenRouter = express.Router(); //unpriveleged
var ClosedRouter = express.Router(); //priveleged
app.use(morgan('combined')); //simple request logging
var DecorateOpenRouter = require('./OpenRouter.js');
var DecorateClosedRouter = require('./ClosedRouter.js');

// DecorateClosedRouter(expressRouter);
app.use(bodyParser.json());
app.use(express.static(__dirname + '../../../client/'));


app.use('/', OpenRouter);
app.use('/', ClosedRouter);

//json web token middleware
ClosedRouter.use(jwtCheck);

//setting up protect/open routes.
DecorateOpenRouter(OpenRouter);
DecorateClosedRouter(ClosedRouter);

require('./config/middleware/Middleware.js')(app, express);

server.listen(port);

console.log("Server listening on port: ", port)

module.exports = app;
