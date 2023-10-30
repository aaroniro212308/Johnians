const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.johnians = require("./johnian.model.js")(mongoose);
db.payments = require("./payment.model.js")(mongoose);

module.exports = db;