const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicesSchema = new Schema({
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


const Services = mongoose.model("Services", ServicesSchema);

module.exports = Services;