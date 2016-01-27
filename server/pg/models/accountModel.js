var pg = require('pg');
var connectionString = "postgres://milkman4:qwerASDF1@localhost:5432/digitcodata";
// Starting join -> select transactions.amount,transactions.score,accounts._id from transactions,accounts where transactions._account = accounts._id;
function _handleError(err, client, done) {
	if (!err) return false;
	if (client) {
		done(client);
	}
	return true;
}

var AccountModel = {
	create: function (accountObj, callback) {
		// accountObj = JSON.parse(accountObj);
		pg.connect(connectionString, function (err, client, done) {
			if (_handleError(err, client, done)) {
				console.log("Error in PG Connection - New Account", err);
				callback(err, null);
				return done();
			}
			var parsed = [
				accountObj._id, //_id
				accountObj._item, //_item
				accountObj.user, //_user
				accountObj.balance.avilable, //balance_avail
				accountObj.balance.current, //balance_cur
				accountObj.institution_type, //institution_type
				JSON.stringify(accountObj.meta), //meta
				accountObj.subtype, //subtype
				accountObj.type //type
			];

			client.query("INSERT INTO accounts(_id, _item, _user, balance_avail, balance_cur, institution_type, meta, subtype, type) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning _id", parsed, function (err, result) {
				if (_handleError(err, client, done)) {
					console.log("Error in PG Query - ", err);
					callback(err, null);
					return done();
				}
				done();
				return callback(null, result.rows[0]);
			});
		});
	},



	update: function (accountId, updateObj, callback) { //{attr:'val',val:'val'}
		pg.connect(connectionString, function (err, client, done) {
			if (_handleError(err, client, done)) {
				console.log("Error in PG Connection - Update User", err);
				callback(err, null);
				return done();
			}
			var parsed = [
				updateObj.val,
				accountId
			];
			client.query("UPDATE accounts SET " + updateObj.attr + "=($1) where _id=($2) returning " + updateObj.attr, parsed, function (err, result) {
				if (_handleError(err, client, done)) {
					console.log("Error in PG Query - Update Account", err);
					callback(err, null);
					return done();
				}
				if (!result) {
					callback("There was a problem");
					return done();
				}
				callback(null, result.rows[0]);
				return done();
			});
		});
	},
	delete: function (accountId, callback) {
		pg.connect(connectionString, function (err, client, done) {
			if (_handleError(err, client, done)) {
				console.log("Error in PG Connection - Delete User", err);
				callback(err, null);
				return done();
			}
			client.query("DELETE FROM accounts WHERE _id=($1) returning _id", [accountId], function (err, result) {
				if (_handleError(err, client, done)) {
					console.log("Error in PG Query - Delete account", err);
					callback(err, null);
					return done();
				}
				callback(null, result.rows[0]);
				return done();
			});
		});
	},
	get: function (queryObj, callback) {
		pg.connect(connectionString, function (err, client, done) {
			if (_handleError(err, client, done)) {
				console.log("Error in PG Connection - Get Accounts", err);
				return callback(err, null);
			}
			client.query("SELECT * FROM accounts WHERE " + queryObj.attr + "=($1)", [queryObj.val], function (err, result) {
				if (_handleError(err, client, done)) {
					console.log("Error in PG Query - Get Accounts", err);
					return callback(err, null);
				}
				callback(null, result.rows);
				return done();
			});
		});
	}
}

module.exports = AccountModel;



// response.accounts.forEach(function (accountObj) {
// 	AccountModel.create(accountObj, function (err, success) {
// 		if (err) return console.log("ERRRRRRR", err);
// 		console.log("SUCESSSSS", success);
// 	})
// });

// AccountModel.update("QPO8Jo8vdDHMepg41PBwckXm4KdK1yUdmXOwK", {
// 	attr: "subtype",
// 	val: "foo"
// }, function (err, success) {
// 	if (err) return console.log("ERRRRRRR", err);
// 	console.log("SUCESSSSS", success);
// })
// AccountModel.delete("QPO8Jo8vdDHMepg41PBwckXm4KdK1yUdmXOwK", function (err, success) {
// 	if (err) return console.log("ERRRRRRR", err);
// 	console.log("SUCESSSSS", success);
// })

// AccountModel.get({
// 	attr: "_id",
// 	val: "XARE85EJqKsjxLp6XR8ocg8VakrkXpTXmRdOo"
// }, function (err, success) {
// 	if (err) return console.log("ERRRRRRR", err);
// 	console.log("SUCESSSSS", success);
// })
