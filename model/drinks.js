const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrinksSchema = new Schema({
	product: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	ingredients: {
		type: String,
		required: true
	}
});


const Drinks = mongoose.model("Drinks", DrinksSchema);

module.exports = Drinks;