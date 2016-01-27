var bodyParser = require('body-parser');
var logger = require('./logger.js');

module.exports = function (app, express) {

	// parse application/x-www-form-urlencoded and application/json
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());

	//logger
	app.use(logger);
};
