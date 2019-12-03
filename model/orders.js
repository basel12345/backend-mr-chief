const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	name: [{
		order: {
			type: String,
			required: true
		}
	}],
	discoount: {
		type: Number,
		required: true
	},
	required: {
		type: Number,
		required: true
	},
	residual: {
		type: Number,
		required: true
	},
	table_id: {
		type: String,
		required: true
	},
	table: {
		type: Schema.Types.ObjectId,
		ref: 'Table'
	}
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order; 