const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
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

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;