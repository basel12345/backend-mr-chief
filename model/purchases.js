const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PurchasesSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	Ingredients: {
		type: String,
		required: true,
		minlength: 3
	},
});

const Purchases = mongoose.model("Purchases",PurchasesSchema);

module.exports = Purchases;