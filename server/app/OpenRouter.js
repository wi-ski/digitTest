var Transaction = require('../pg/models/transactionModel.js');
var Account = require('../pg/models/accountModel.js');

module.exports = function (router) { //might refactor to use _id(mongo atm)
	console.log("=-=-=-=-=-=-=-=OPEN ROUTER ROUTES LOADED=-=-=-=-=-=-=-=")
	router.get("/transaction/:attribute/:val", function (req, res) { //should return the last 20 entries
		//pg stuff
	});

	router.post("/transaction/:attribute/:val", function (req, res) {
		//pg stuff
	});
	router.post("/transaction/new/", function (req, res) {
		//pg stuff
	});



	router.post("/account/:attribute/:val", function (req, res) {
		//pg stuff
	});
	router.get("/account/:attribute/:val", function (req, res) {
		//pg stuff
	});

	router.post("/account/new", function (req, res) {
		//pg stuff
	});
}
