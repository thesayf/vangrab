// grab the mongoose module
var mongoose = require('mongoose');

// define the schema for our user model
var quoteSchema = mongoose.Schema({
	userID: String,
	jobName: String,
	vanType: String,
	jobDate: String,
	fuelPrice: Number,
	suggestedPrice: Number,
	driverNote: String,
	address: {},
	distance: {},
	pk: String,
	bookingKey: String,
	recieptUrl: String,
	status: String,
	finalCost: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Quote', quoteSchema);
